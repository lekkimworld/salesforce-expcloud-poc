import { LightningElement, api } from 'lwc';

/**
 * @slot 
 */
export default class PartnershipTheme extends LightningElement {
    @api showBanner;
    @api startColor;
    @api middleColor;
    @api endColor;

    renderedCallback() {
        const elem = this.template.querySelector(".container");
        elem.style.background = `linear-gradient(170deg, ${this.startColor || "rgba(4, 1, 66, 0.5)"} 0%, ${this.middleColor || "rgba(9, 76, 121, 0.61)"} 35%, ${this.endColor || "rgb(255, 0, 74)"} 100%)`;
    }
}