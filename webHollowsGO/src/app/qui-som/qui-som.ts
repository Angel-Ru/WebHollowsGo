import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-qui-som',
  templateUrl: './qui-som.html',
  styleUrls: ['./qui-som.css'],
  standalone: true,
  imports: [RouterModule],
})
export class QuiSomComponent   {
  constructor(private _router: Router) {
  }

  goInici(): void {
    this._router.navigate(['/']);
  }


}
