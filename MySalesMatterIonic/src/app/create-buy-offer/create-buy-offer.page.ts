import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OfferType } from '../enums/offer-type.enum';
import { Offer } from '../models/offer';
import { OfferService } from '../services/offer.service';
import { ListingService } from '../services/listing.service';
import { Listing } from '../models/listing';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-create-buy-offer',
  templateUrl: './create-buy-offer.page.html',
  styleUrls: ['./create-buy-offer.page.scss'],
})
export class CreateBuyOfferPage implements OnInit {

  submitted: boolean;
  userId: number;
  listingId: number;
  listing: Listing;
  totalPrice: number;

  retrieveListingError: boolean;
  resultSuccess: boolean;
  resultError: boolean;
  message: string;



  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private offerService: OfferService,
    private listingService: ListingService,
    private sessionService: SessionService) {
    this.submitted = false;

    this.resultSuccess = false;
    this.resultError = false;
    this.userId = this.sessionService.getCurrentUser().userId;
  }



  ngOnInit() {
    this.listingId = parseInt(this.activatedRoute.snapshot.paramMap.get('listingId'));
    this.listingService.getListingByListingId(this.listingId).subscribe(
      response => {
        this.listing = response;
        this.totalPrice = this.listing.salePrice;
      },
      error => {
        this.retrieveListingError = true;
        console.log('********** CreateBuyOfferPage.ts: ' + error);
      }
    );
  }



  clear() {
    this.submitted = false;
  }



  create(createBuyOfferForm: NgForm) {

    this.submitted = true;

    if (createBuyOfferForm.valid) {
      this.offerService.createNewOffer(this.totalPrice, new Date(), OfferType.BUY, null, null, this.listingId, this.userId).subscribe(
        response => {
          let newOfferCreated: Offer = response;
          this.resultSuccess = true;
          this.resultError = false;
          this.message = "New buy offer " + newOfferCreated + " created successfully";

          this.submitted = false;
          createBuyOfferForm.reset();
        },
        error => {
          this.resultError = true;
          this.resultSuccess = false;
          this.message = "An error has occurred while creating the new buy offer: " + error;

          console.log('********** CreateBuyOfferPage.ts: ' + error);
        }
      );
    }
  }

  back() {
    this.router.navigate(["/viewListingDetails/" + this.listingId]);
  }
}
