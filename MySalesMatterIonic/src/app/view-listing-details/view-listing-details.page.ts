import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Listing } from '../models/listing';
import { ListingService } from '../services/listing.service';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-view-listing-details',
  templateUrl: './view-listing-details.page.html',
  styleUrls: ['./view-listing-details.page.scss'],
})
export class ViewListingDetailsPage implements OnInit {

  listingId: number;
  listingToView: Listing;
  rentalAvailability: boolean;
  forSaleAvailability: boolean;
  retrieveListingError: boolean;
  error: boolean;
  errorMessage: string;
  resultSuccess: boolean;



  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private listingService: ListingService,
    private sessionervice: SessionService,
    public alertController: AlertController) {
    this.retrieveListingError = false;
    this.error = false;
    this.resultSuccess = false;
  }



  ngOnInit() {
    this.listingId = parseInt(this.activatedRoute.snapshot.paramMap.get('listingId'));
    this.refreshListing();
  }



  ionViewWillEnter() {
    this.refreshListing();
  }



  refreshListing() {
    this.listingService.getListingByListingId(this.listingId).subscribe(
      response => {
        this.listingToView = response;
        this.rentalAvailability = this.listingToView.rentalAvailability;
        this.forSaleAvailability = this.listingToView.forSaleAvailability;
      },
      error => {
        this.retrieveListingError = true;
        console.log('********** ViewListingDetailsPage.ts: ' + error);
      }
    );
  }

  checkRentalAvail() {
    if (!this.rentalAvailability || this.listingToView.user.userId == (this.sessionervice.getCurrentUser().userId)) {
      return false;
    }
    return true;
  }

  checkBuyAvail() {
    if (!this.forSaleAvailability || this.listingToView.user.userId == (this.sessionervice.getCurrentUser().userId)) {
      return false;
    }
    return true;
  }

  createRentalOffer() {
    this.router.navigate(['/createRentalOffer/' + this.listingId]);
  }

  createBuyOffer() {
    this.router.navigate(["/createBuyOffer/" + this.listingId]);
  }

  viewReviews() {
    this.router.navigate(["viewAllReviews/" + this.listingId]);
  }

  back() {
    this.router.navigate(["browseAllListings"]);
  }

}
