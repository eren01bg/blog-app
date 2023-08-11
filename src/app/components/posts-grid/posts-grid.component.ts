import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-posts-grid',
  templateUrl: './posts-grid.component.html',
  styleUrls: ['./posts-grid.component.css']
})
export class PostsGridComponent implements OnInit {

  constructor() { }

  // imageUrl, label, title, authorImg, authorName, date

  posts = [
    {
      imageUrl: 'https://picsum.photos/200/300',
      label: 'Technology',
      title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.',
      authorImg: 'https://picsum.photos/200/300',
      authorName: 'John Doe',
      date: 'May 24, 2019'
    },
    {
      imageUrl: 'https://picsum.photos/200/300',
      label: 'Technology',
      title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.',
      authorImg: 'https://picsum.photos/200/300',
      authorName: 'John Doe',
      date: 'May 24, 2019'
    },
    {
      imageUrl: 'https://picsum.photos/200/300',
      label: 'Technology',
      title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.',
      authorImg: 'https://picsum.photos/200/300',
      authorName: 'John Doe',
      date: 'May 24, 2019'
    },
    {
      imageUrl: 'https://picsum.photos/200/300',
      label: 'Technology',
      title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.',
      authorImg: 'https://picsum.photos/200/300',
      authorName: 'John Doe',
      date: 'May 24, 2019'
    },
    {
      imageUrl: 'https://picsum.photos/200/300',
      label: 'Technology',
      title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.',
      authorImg: 'https://picsum.photos/200/300',
      authorName: 'John Doe',
      date: 'May 24, 2019'
    },
    {
      imageUrl: 'https://picsum.photos/200/300',
      label: 'Technology',
      title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.',
      authorImg: 'https://picsum.photos/200/300',
      authorName: 'John Doe',
      date: 'May 24, 2019'
    }
  ];





  ngOnInit() {
  }

}
