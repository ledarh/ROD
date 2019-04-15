import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from "nativescript-angular/router";

@Component({
  selector: 'ns-toolkit',
  templateUrl: './toolkit.component.html',
  styleUrls: ['./toolkit.component.css'],
  moduleId: module.id,
})
export class ToolkitComponent implements OnInit {
  //https://play.nativescript.org/?template=play-ng&id=TIzFdC&v=4

  listItem = [];


  constructor(private routerExtension: RouterExtensions) { }

  ngOnInit() {

    this.listItem.push({ id: 1, type: "top", text: "AA Big Book", src: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png" });
    this.listItem.push({ id: 2, type: "normal", text: "Ivysaur", src: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png" });
    this.listItem.push({ id: 3, type: "normal", text: "CockDino", src: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png" });

  }

  onItemTap(args) {
    console.log("You tapped: " + this.listItem[args.index].text);

    if (this.listItem[args.index].id === 1 ) {
      console.log("hit");
      this.routerExtension.navigate(["./bigbook"], { clearHistory: false });
    }
  }

}
