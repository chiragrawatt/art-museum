import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IArtworksResponse } from '../models/interfaces/ArtworksResponse';
import { ARTWORKS_API_URL } from '../constants/api.constant';
import { IArtwork } from '../models/interfaces/Artwork';

@Injectable({
  providedIn: 'root'
})
export class ArtworkService {
  artworks$: BehaviorSubject<IArtworksResponse | null> = new BehaviorSubject<IArtworksResponse | null>(null);
  artwork$: BehaviorSubject<IArtwork | null> = new BehaviorSubject<IArtwork | null>(null);

  constructor(private http: HttpClient) { }

  fetchArtworks(page: number, limit: number, search: string): void {
    let apiURL = `${ARTWORKS_API_URL}?page=${page}&limit=${limit}`
    if(search.length!=0) {
      apiURL = `${ARTWORKS_API_URL}/search?q=${search}&limit=${limit}`;
    }
    this.http.get(apiURL)
      .subscribe({
        next: res => this.artworks$.next(res as IArtworksResponse),
        error: err => console.log(err)
      });
  }

  fetchArtworkById(id: string) {
    let apiURL = `${ARTWORKS_API_URL}?ids=${id}`;

    this.http.get<IArtworksResponse>(apiURL)
      .subscribe({
        next: res => this.artwork$.next(res.data[0]),
        error: err => console.log(err)
    })
  }
}
