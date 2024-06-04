import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'tf-card',
    templateUrl: './small-card.component.html',
    styleUrls: ['./small-card.component.scss'],
    standalone: true,
    imports: [CommonModule]
})
export class TFCardComponent implements OnInit {

    
    @Input() public body: string = '';
    @Input() public clicked: boolean | undefined = false;
    constructor() { }

    ngOnInit(): void {
        // Initialization code goes here
    }

}