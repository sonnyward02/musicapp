import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MusicServiceService} from '../service/music-service.service';

@Component({
  selector: 'app-delete-album',
  templateUrl: './delete-album.component.html',
  styleUrls: ['./delete-album.component.css']
})
export class DeleteAlbumComponent implements OnInit {

  constructor(private route: ActivatedRoute, private service: MusicServiceService) {  }

  ngOnInit()
  {
    let artist: string | null = this.route.snapshot.paramMap.get('artist');
    let id: string | null = this.route.snapshot.paramMap.get('id');

    if (artist !== null && id !== null) {
      this.service.deleteAlbum(Number.parseInt(id), artist, (status: any) => {
        console.log("The return from deleteAblum() was " + status);
      });
    }
  }
}
