import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Artist } from '../models/Artist';
import { Album } from '../models/Album';
import { Track } from '../models/Track';

@Injectable({providedIn: 'root'})
export class MusicServiceService
{
  hostname:string = "http://localhost:3000";

  constructor(private http: HttpClient) { }

  public getArtists(callback:any)
  {
    // Call the Get Artists API using a HTTP GET
    this.http.get<Artist[]>(this.hostname + "/artists")
      .subscribe((data) =>
      {
        let artists:Artist[] = [];
        for(let x=0;x < data.length;++x)
        {
          artists.push(new Artist(data[x]['id'], data[x]['name']));
        }
        callback(artists);
       });
  }

  public getAlbums(artist:string, callback:any)
  {
    // Call the Get Albums API using a HTTP GET
    this.http.get<Album[]>(this.hostname + "/albums/" + artist)
      .subscribe((data) =>
      {
        let albums:Album[] = [];
        for(let x =0;x < data.length;++x)
        {
            let tracks: Track[] = [];
            for(let y =0;y < data[x]['tracks'].length;++y)
              tracks.push(new Track(data[x]['tracks'][y]['id'], data[x]['tracks'][y]['number'], data[x]['tracks'][y]['title'], data[x]['tracks'][y]['lyrics'], data[x]['tracks'][y]['video']));
            albums.push(new Album(data[x]['id'], data[x]['title'], data[x]['artist'], data[x]['description'], data[x]['year'], data[x]['image'], tracks));
        }
        callback(albums);
       });
  }

  public getAlbum(artist:string, id:number, callback:any)
  {
    // Call the Get Album API using a HTTP GET
    this.http.get<Album>(this.hostname + "/albums/" + artist + "/" + id)
      .subscribe((data) =>
      {
        let tracks:Track[] = [];
        for(let y =0;y < data['tracks'].length;++y)
          tracks.push(new Track(data['tracks'][y]['id'], data['tracks'][y]['number'], data['tracks'][y]['title'], data['tracks'][y]['lyrics'], data['tracks'][y]['video']));
        let album:Album = new Album(data['id'], data['title'], data['artist'], data['description'], data['year'], data['image'], tracks);
        callback(album);
    });
  }

  public createAlbum(album:Album, callback:any)
  {
    // Call the Create Album API using a HTTP POST
    this.http.post<Album>(this.hostname + "/albums", album)
    .subscribe((data) =>
    {
      callback(data);
    });
  }

  public updateAlbum(album:Album, callback:any)
  {
    // Call the Update Album API using a HTTP PUT
    this.http.put<Album>(this.hostname + "/albums", album)
    .subscribe((data) =>
    {
      callback(data);
    });
  }

  public deleteAlbum(id:number, artist:string, callback:any)
  {
    // Search for the Album in the list of Albums and delete from the list
    this.http.delete(this.hostname + "/albums/" + artist + "/" + id)
    .subscribe((data) =>
    {
      callback(data);
    });
  }
}
