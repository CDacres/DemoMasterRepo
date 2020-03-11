<?php

namespace App\Events;

use App\Models\Booking\Review;
use App\Models\VenueAsset;
use App\Models\Booking\Reservation;
use App\Models\VenueReviewRequest;
use App\Models\User;

use App\Helpers\CommHelper;
use App\Helpers\AnalyticsHelper;

class ReviewCreatedEvent extends Event
{
    public function __construct(Review $review)
    {
        $user = User::find($review->userby);
        if (!is_null($user))
        {
            $venue = VenueAsset::fromChild($review->asset_id)->with('details')->first();
            if (!is_null($review->reservation_id))
            {
                $reservation = Reservation::find($review->reservation_id);
                if (!is_null($reservation))
                {
                    $reservation->update_reservation_status(ReservationStatus::COMPLETED);
                    if (!is_null($reservation->review_token))
                    {
                        $reservation->remove_review_token();
                    }
                }
            }
            else
            {
                $venue_reviews = VenueReviewRequest::where('user_id', $review->userby)->where('asset_id', $review->asset_id)->get();
                if (!is_null($venue_reviews))
                {
                    foreach ($venue_reviews as $venue_review)
                    {
                        $venue_review->remove_review_audit_token();
                    }
                }
            }
            if (!is_null($venue))
            {
    //            $modelFullRoom = Model__full_rooms::class;
    //            $this->load->model($modelFullRoom);
    //            $rooms = $this->$modelFullRoom->get_room_object_collection_by_venue_id($venue->get_id());
    //            $venue->set('review_count', $venue->get('review_count') + 1);
    //            $venue->set('review_score', $rooms->get_overall_score()); //?
    //            $this->$venuesModel->insert_update($venue);
                $commHelper = new CommHelper();
                $commHelper->new_review_received($review);
                $commHelper->thank_reviewer($user, $venue->details->name);
            }
            $currentUser = $review->get_reviewing_user();
            AnalyticsHelper::register_step('VOLUNTARY_INTERACTION', $user->canonical_cookie_id, $user->language_pref, (($currentUser->isSpoofMode())?$currentUser->adminspoofid:null), 'User added review');
        }
    }
}