<template>
  <v-network-graph
    :nodes='nodes'
    :edges='edges'
    :configs='configs'
    :layouts="layouts"
    :event-handlers="eventHandlers"
  >
  <!--<template #edge-label="{ edge, ...slotProps }">
      <v-edge-label :text="edge.label" align="center" vertical-align="above" v-bind="slotProps" />
  </template>-->
  </v-network-graph>
</template>

<script lang='ts'>
/* eslint-disable */
import { defineComponent, reactive } from 'vue'
import * as vNG from 'v-network-graph'
import axios from 'axios'
import {
  ForceLayout,
  ForceNodeDatum,
  ForceEdgeDatum,
} from "v-network-graph/lib/force-layout"


export default defineComponent({
  props: {
    sheetName: String
  },
  setup () {
    const configs = reactive(
      vNG.defineConfigs({
        view: {
          panEnabled: true,
          zoomEnabled: true,
          scalingObjects: false,
        },
        node: {
          selectable: true,
          draggable: true,
          label: {
            visible: true,
            fontFamily: 'monospace',
            color: "#ffffff"
          },
          selected: {
            type: "circle",
            radius: 16,
            color: "#fff",
          },
          hover: {
            type: "circle",
            radius: 16,
            color: "#fff",
          }
        }
      })
    )
    const eventHandlers: vNG.EventHandlers = {
      "node:click": ({ node }) => {
        console.log("clicked ", node)
      },
    }
    return { configs, eventHandlers }
  },
  mounted () {
    const url = 'https://docs.google.com/spreadsheets/d/1l8NALL87S5_vra7CM6UCBXBNTI7dY4kkIE1fO2GYBkw/gviz/tq?tqx=out:csv&sheet=Electronics%20Track'// 'https://docs.google.com/spreadsheets/d/1l8NALL87S5_vra7CM6UCBXBNTI7dY4kkIE1fO2GYBkw/edit?usp=sharing'
    axios.get(url)
      .then(res => {
        //console.log(res.data.split('\n'))
        // this.csv = res.data.split('\n')
        this.csv = res.data
        // this.csv = table
        //console.log(this.csv)
        // console.log(res.data.split('<table')[2])
        this.csv = this.csvToArray(this.csv)
        // console.log(this.csv)
      })
  },
  methods : {
    csvToArray(csv: any){
      const table : string[] = []
      for (let i = 0; i < csv.split('\n').length; i++) {
          let row = csv.split('\n')[i]
          row = row.split(',')
          for (let j = 0; j < row.length; j++) {
            row[j] = row[j].substring(1, row[j].length - 1)
          }
          table.push(row)
      }
      
      this.extractNodes(table)
      this.extractEdges(table)
      this.extractLayout(table)
      this.extractLayoutWithRealEstate(table)
      return table
    },
    extractNodes(table: any){
      let nodes = []
      
      for (let i = 1; i<table.length; i++){
        nodes.push(table[i][0])
        //const prereqs = table[i][2].split(';')
        //if (prereqs != '') nodes.push(...prereqs)
        
      }
      
      //nodes = [...new Set(nodes)];
      console.log("nodes temp", nodes)
      for (let i = 0; i<nodes.length; i++){
        this.nodes.push({ name: nodes[i] })
      }
      this.nodes.shift()
      console.log("nodes temp", this.nodes)
    },
    distance(x1:number,y1:number,x2:number,y2:number){
      return ((x2-x1)**2 + (y2-y1)**2)**0.5
    },
    extractLayout(table: any){
      let layout : any = {}
      /*let pos_x = [-100, -50, 0, 50, 100]
      let min_dist = 1000
      for (let i=0; i<this.nodes.length; i++){
        for (let j=0; j<pos_x.length; j++){
          const linkedTo = table[i+1][2].split(';')
          for (let k=0; k<linkedTo.length; k++){
            for (let l=0; l<pos_x.length; l++){
              if (this.distance(pos_x[j], pos_x[l], -200*table[i+1][6], -200*table[this.findNodeIndex(linkedTo[k]).toString()+1][6])<min_dist){
                min_dist = this.distance(pos_x[j], pos_x[l], -200*table[i+1][6], -200*table[this.findNodeIndex(linkedTo[k]).toString()+1][6])

              }
            }
          }
        }
      }*/
      let num_connections = []
      let connections : any = []
      let conns : any = []
      let num_conn = 0
      let node_index = 0
      for (let i=0; i<this.nodes.length; i++){
        for (let j=0 ;j<this.edges.length;j ++){
          node_index = this.findNodeIndex(this.nodes[i].name)
          if (this.edges[j].source=== node_index.toString() || this.edges[j].target===node_index.toString()){
            num_conn += 1
            if (this.edges[j].source=== node_index.toString()){
              conns.push(this.edges[j].target)
            }
            else{
              conns.push(this.edges[j].source)
            }
          }
        }
        num_connections[i] = num_conn
        num_conn = 0
        connections.push(conns)
        conns = []
      }
      //console.log(num_connections, connections)
      let x : any = []
      // find real estate value => num of ones with target = i
      for (let i=0; i<this.nodes.length; i++){
        if (num_connections[i]===Math.max(...num_connections)){//(i===num_connections.indexOf(Math.max(...num_connections))){
          layout[i.toString()] = { x:1500, y:-100*table[i+1][6]}
          // HANDLED multiple max values
        }
        else if (num_connections[i]===1){
          if ((layout[connections[i][0]])!=undefined) {
            //console.log(Object.keys(layout.length))
            /*for (let j=0; j<Object.keys(layout).length;j++){
              if (layout[j] != undefined){
                console.log("j", layout[j].x == (layout[connections[i][0]])['x'], layout[j].y==-100*table[i+1][6])
                if (layout[j].x ==(layout[connections[i][0]])['x'] && layout[j].y==-100*table[i+1][6]){
                  console.log("true", layout[j]['x'])
                  //(layout[connections[i][0]])['x'] -= 50
                }
              }
            }*/
            //console.log (i ,Object.values(layout), { x:(layout[connections[i][0]])['x'], y:-100*table[i+1][6]})
            layout[i.toString()] = { x:(layout[connections[i][0]])['x'], y:-100*table[i+1][6]}
          }
        }
        // if one connection up and one connection down
        else {
          layout[i.toString()] = { x:i*350, y:-100*table[i+1][6]}
        }
      }
      for (let i=0; i<Object.keys(layout).length;i++){
        for (let j=0; j<Object.keys(layout).length; j++){
          if (i!=j){
            //if (i==1 && j==5) console.log("change", layout[i.toString()].x == layout[j.toString()].x && layout[i.toString()].y == layout[j.toString()].y)
            //if (layout[i.toString()]!=undefined) console.log(i, layout[i.toString()]!)
            if (layout[Object.keys(layout)[i].toString()]!=undefined && layout[Object.keys(layout)[j].toString()]!=undefined && layout[Object.keys(layout)[i].toString()].x == layout[Object.keys(layout)[j].toString()].x && layout[Object.keys(layout)[i].toString()].y == layout[Object.keys(layout)[j].toString()].y){
              layout[Object.keys(layout)[i].toString()].x += 175
              layout[Object.keys(layout)[j].toString()].x -= 175
              console.log("change")
              
            }
          }
        }
        //console.log("h", parseInt(Object.keys(layout)[i]))
        if (num_connections[parseInt(Object.keys(layout)[i])]===1){
          if ((layout[connections[parseInt(Object.keys(layout)[i])][0]])!=undefined) {
            console.log(i)
            layout[Object.keys(layout)[i].toString()] = { x:(layout[connections[parseInt(Object.keys(layout)[i])][0]])['x'], y:-100*table[parseInt(Object.keys(layout)[i])+1][6]}
          }
        }
      }
      console.log('table', table)
      console.log("layout", layout)
      console.log('edges', this.edges)
      console.log("nodes", this.nodes)
      this.layouts.nodes = layout
    },
    extractLayoutWithRealEstate(table: any){
      let layout : any = {}
      let node_list = []
      console.log('table', table)
      for (let i=0; i<=Math.max(...this.findDifficultyLevels(table)); i++){
        node_list = []
        for (let j=0; j<this.findDifficultyLevels(table).length;j++){
          if (this.findDifficultyLevels(table)[j]===i.toString()) node_list.push(j)
        }
        if (node_list.length === 1){
          layout[node_list[0].toString()] = {x:0,y:-100*table[node_list[0]+1][6]}
        }
        else {
          let sum =0
          for (let j=0; j<node_list.length;j++){
            sum += this.findRealEstateVal(node_list[j])
          }
          //console.log(node_list, sum)
          // multiply sum of real estate value as sum*100 and use -sum*100 to +sum*100 as the range of x-vals, split up this range based on ratio of RE and assign each node the midpoint of the space provided to it
          let x_range = sum*200
          let x_pos = -sum*100
          for (let j=0; j<node_list.length;j++){
            layout[node_list[j]] = { x: x_pos + (this.findRealEstateVal(node_list[j])/sum * x_range)/2, y:-100*table[node_list[j]+1][6]} 
            x_pos += this.findRealEstateVal(node_list[j])*x_range/sum
          }
        }
        //console.log("layout new", layout)
      }
      console.log("layout new", layout)
      this.layouts.nodes = layout
    },
    findDifficultyLevels(table: any){
      let diff = []
      for (let i=1 ;i<table.length;i++){
        diff.push(table[i][6])
      }
      return diff
    },
    findRealEstateVal(i: Number){
      let num_connections = 0.5
      for (let j=0; j<this.edges.length; j++){
        //console.log(this.edges[j].target, i)
        if (this.edges[j].target===i.toString()) num_connections++
      }
      return (num_connections)
    },
    findNodeIndex(nodeName: String){
      for (let i=0; i<this.nodes.length;i++){
        if (nodeName === this.nodes[i].name) return i
      }
      console.log("cannot find ", nodeName)
      return -1
    },
    extractEdges(table: any){
      let edges = []
      for (let i = 1; i<table.length; i++){
        //console.log(table[i][0], this.nodes[6].name, this.findNodeIndex(table[i][0]))
        const prereqs = table[i][2].split(';')
        for (let j=0; j<prereqs.length;j++){
          //if (this.findNodeIndex(table[i][0]).toString() != '-1' && this.findNodeIndex(prereqs[j]).toString() != '-1') 
          //IDEALLY SHOULD BE REMOVING EDGES WITH TARGETS OF -1 BECAUSE WE HAVE NO NODE WITH ID -1
          edges.push({ source: this.findNodeIndex(table[i][0]).toString(), target: this.findNodeIndex(prereqs[j]).toString(), label : `edge-${this.findNodeIndex(table[i][0]).toString()}-${this.findNodeIndex(prereqs[j]).toString()}`})
        }
      }
      this.edges = edges
    }
  },
  data () {
    return {
      csv: ['test'],
      nodes : [
        { name : 'Test'}
      ],
      edges : [
        { source: "0", target: "1", label:'test-edge' }
      ],
      layouts : {
        nodes: {}
      }
    }
  }
})
</script>

<style scoped>
.layouts {
  position: absolute;
  inset: auto 100px 600px auto;
  padding: 10px;
  background: #ffff0044;
  border-radius: 4px;
  font-size: 10px;
  line-height: 11px;
}
</style>
