/**
 * Created by filip on 2017-03-23.
 */
import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import {Device} from "./device";
import {House} from "./house";
import {Room} from "./room";



@Injectable()
export class ApiCallsservice {
  private baseUrl: string = 'http://46.101.241.205:3000/api/';
  constructor(private http : Http){
  }

  getHouses(): Observable<House[]> {
    let houses$ = this.http
      .get(this.baseUrl + 'houses', {headers: this.getHeaders()})
      .map(mapHouses);
    return houses$;
  }

  getHouse(id: string): Observable<House> {
    let house$ = this.http
      .get(this.baseUrl + 'houses/' + id, {headers: this.getHeaders()})
      .map(mapHouse);
    return house$;
  }

  getRooms(): Observable<Room[]> {
  let rooms$ = this.http
    .get(this.baseUrl + 'rooms', {headers: this.getHeaders()})
    .map(mapRooms);
  return rooms$;
}

  getRoom(id): Observable<Room> {
    let room$ = this.http
      .get(this.baseUrl + 'rooms/' + id, {headers: this.getHeaders()})
      .map(mapRoom);
    return room$;
  }

  getDevices(): Observable<Device[]> {
    let devices$ = this.http
      .get(this.baseUrl + 'devices', {headers: this.getHeaders()})
      .map(mapDevices);
    return devices$;
  }

  getDevice(id): Observable<Device> {
    let device$ = this.http
      .get(this.baseUrl + 'devices/' + id, {headers: this.getHeaders()})
      .map(mapDevice);
    return device$;
  }

  updateDevice(device): Observable<Response> {
    console.log(this.baseUrl + 'devices/' + device._id);
    console.log(JSON.stringify(device));
    let response$ = this.http
      .put(this.baseUrl + 'devices/' + device._id, JSON.stringify(device), {headers: this.getHeaders()})
    return response$;
  }

  private getHeaders(){
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    return headers;
  }
}

function mapHouses(response:Response): House[]{
  // The response of the API has a results
  // property with the actual results
  return response.json().map(toHouse);
}

function mapHouse(response:Response): House{
  // The response of the API has a results
  // property with the actual results
  return response.json();
}

function toHouse(r: any): House{
  console.log(r._id);
  let house = <House>({
    _id: r._id,
    name: r.name,
    powerData: r.powerData,
    temperature: r.temperature
  });
  //console.log('Parsed house:', house);
  return house;
}



function mapRooms(response:Response): Room[]{
  // The response of the API has a results
  // property with the actual results
  return response.json().map(toRoom);
}

function mapRoom(response:Response): Room{
  // The response of the API has a results
  // property with the actual results
  return response.json();
}

function toRoom(r: any): House{
  console.log(r._id);
  let house = <House>({
    _id: r._id,
    name: r.name,
    powerData: r.powerData,
    houseId: r.houseId,
    temperature: r.temperature
  });
  //console.log('Parsed room:', house);
  return house;
}

function mapDevices(response:Response): Device[]{
  return response.json().map(toDevice);
}

function mapDevice(response:Response): Device{
  console.log('Parsed device:', response.json());
  return response.json();
}


function toDevice(r: any): Device{
  console.log(r._id);
  let device = <Device>({
    _id: r._id,
    name: r.name,
    roomId: r.roomId,
    dimmer: r.dimmer,
    temp: r.temp,
    temperature: r.temperature,
    powered: r.powered,
    powerConsumption: r.powerConsumption,
    powerData: r.powerData,
    __v: r.__v,
    __t: r.__t,
  });

  return device;
}
