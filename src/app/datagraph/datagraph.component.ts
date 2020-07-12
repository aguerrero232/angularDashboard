import { ActivatedRoute } from '@angular/router';
import { DataService } from './../data.service';
import { DATA } from '../mock-data';
import { Data } from '../data';

import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import * as d3Scale from 'd3';
import * as d3Shape from 'd3';
import * as d3Array from 'd3';
import * as d3Axis from 'd3';

@Component({
  selector: 'app-datagraph',
  templateUrl: './datagraph.component.html',
  styleUrls: [ './datagraph.component.css' ]
})
export class DatagraphComponent implements OnInit  {
  public title = 'Line Chart';
  dataArray: Data[];
  data: Data;
  score: number;
  date: Date;

  private margin = {top: 20, right: 20, bottom: 30, left: 50};
  private width: number;
  private height: number;
  private x: any;
  private y: any;
  private svg: any;
  private line: d3Shape.Line<[number, number]>; // this is line defination
 
  constructor (  private route: ActivatedRoute, public dataservice: DataService) {
    // configure margins and width/height of the graph
    this.dataArray = dataservice.getDataArray();
    this.width = 960 - this.margin.left - this.margin.right;
    this.height = 500 - this.margin.top - this.margin.bottom;
  }
  
  public ngOnInit() {
    this.buildSvg();
    this.addXandYAxis();
    this.drawLineAndPath();
  }

  private buildSvg() {
    this.svg = d3.select('svg') // svg element from html
      .append('g' )   // appends 'g' element for graph design
      .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');
  }
  
  private addXandYAxis() {
    // range of data configuring
    this.x = d3.scaleTime().range([0, this.width]);
    this.y = d3.scaleLinear().range([this.height, 0]);
    this.x.domain(d3.extent(this.data, (d) => d.date ));
    this.y.domain(d3.extent(this.data, (d) => d.value ));
    // Configure the X Axis
    this.svg.append('g')
        .attr('transform', 'translate(0,' + this.height + ')')
        .call(d3.axisBottom(this.x));
    
    // Configure the Y Axis
    this.svg.append('g')
        .attr('class', 'axis axis--y')
        .call(d3.axisLeft(this.y));
  }
  
  
  private drawLineAndPath() {
        this.line = d3.line()
        .x( d => this.x(d.date) )
        .y( d => this.y(d.value) );
      
        // Configuring line path
        this.svg.append('path')
        .datum(this.data)
        .attr('class', 'line')
        .attr('d', this.line);
  }

  getDate(): void {
    this.date = new Date(this.route.snapshot.paramMap.get('date'));
  }

  getScore(): void {
    this.score = Number.parseInt(this.route.snapshot.paramMap.get('value'));
  }

  private addPoint(){
   this.data.date = this.date;
   this.data.value = this.score;
    this.dataservice.addToData(this.data);
    this.buildSvg();
    this.addXandYAxis();
    this.drawLineAndPath();
  }


}