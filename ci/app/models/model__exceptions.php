<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Model__exceptions extends Model_Base__Object
{
    function __construct()
    {
        $this->_set_base_class(Base__Null::class);
        parent::__construct();
    }

    public function get_multiple_payment_audits($unbuffered)
    {
        $this->db->select("COUNT(" . Payment_Audit::column('payment_id') . ") AS payment_count, " . Payment_Audit::column('payment_id') . " AS payment_id, " . Payment_Status::column('name') . " AS payment_status");
        $this->db->advanced_join(Payment_Audit::class, Payment_Status::class, Payment_Audit::column('payment_status_id', false), Payment_Status::id_column(false), "INNER");
        $this->db->group_by(Payment_Audit::column('payment_id'));
        $this->db->group_by(Payment_Status::column('name'));
        $this->db->having('payment_count > ', 1);
        $this->db->from(Payment_Audit::tableName());
        return $this->_run_exception_query($unbuffered);
    }

    public function get_payments_without_audits($unbuffered)
    {
        $this->db->select(Payment::id_column() . " AS payment_id, " . Payment_Status::column('name') . " AS payment_status");
        $this->db->advanced_join(Payment::class, Payment_Status::class, Payment::column('payment_status_id', false), Payment_Status::id_column(false), "INNER");
        $this->db->advanced_join(Payment::class, Payment_Audit::class, Payment::id_column(false), Payment_Audit::column('payment_id', false));
        $this->db->where(Payment_Audit::column('payment_id'));
        $this->db->from(Payment::tableName());
        return $this->_run_exception_query($unbuffered);
    }

    public function get_multiple_reservation_audits($unbuffered)
    {
        $this->db->select("COUNT(" . Reservation_Audit::column('reservation_id') . ") AS reservation_count, " . Reservation_Audit::column('reservation_id') . " AS reservation_id, " . Reservation_Status::column('name') . " AS reservation_status");
        $this->db->advanced_join(Reservation_Audit::class, Reservation_Status::class, Reservation_Audit::column('reservation_status_id', false), Reservation_Status::id_column(false), "INNER");
        $this->db->group_by(Reservation_Audit::column('reservation_id'));
        $this->db->group_by(Reservation_Status::column('name'));
        $this->db->having('reservation_count > ', 1);
        $this->db->from(Reservation_Audit::tableName());
        return $this->_run_exception_query($unbuffered);
    }

    public function get_reservations_without_audits($unbuffered)
    {
        $this->db->select(Reservation::id_column() . " AS reservation_id, " . Reservation_Status::column('name') . " AS reservation_status");
        $this->db->advanced_join(Reservation::class, Reservation_Status::class, Reservation::column('reservationStatus_id', false), Reservation_Status::id_column(false), "INNER");
        $this->db->advanced_join(Reservation::class, Reservation_Audit::class, Reservation::id_column(false), Reservation_Audit::column('reservation_id', false));
        $this->db->where(Reservation_Audit::column('reservation_id'));
        $this->db->from(Reservation::tableName());
        return $this->_run_exception_query($unbuffered);
    }

    public function get_multiple_enquiry_audits($unbuffered)
    {
        $this->db->select("COUNT(" . Enquiry_Audit::column('enquiry_id') . ") AS enquiry_count, " . Enquiry_Audit::column('enquiry_id') . " AS enquiry_id, " . Enquiry_Status::column('name') . " AS enquiry_status");
        $this->db->advanced_join(Enquiry_Audit::class, Enquiry_Status::class, Enquiry_Audit::column('enquiry_status_id', false), Enquiry_Status::id_column(false), "INNER");
        $this->db->group_by(Enquiry_Audit::column('enquiry_id'));
        $this->db->group_by(Enquiry_Status::column('name'));
        $this->db->having("enquiry_count > ", 1);
        $this->db->from(Enquiry_Audit::tableName());
        return $this->_run_exception_query($unbuffered);
    }

    public function get_enquiries_without_audits($unbuffered)
    {
        $this->db->select(Enquiry::id_column() . " AS enquiry_id, " . Enquiry_Status::column('name') . " AS enquiry_status");
        $this->db->advanced_join(Enquiry::class, Enquiry_Status::class, Enquiry::column('status', false), Enquiry_Status::id_column(false), "INNER");
        $this->db->advanced_join(Enquiry::class, Enquiry_Audit::class, Enquiry::id_column(false), Enquiry_Audit::column('enquiry_id', false));
        $this->db->where(Enquiry_Audit::column('enquiry_id'));
        $this->db->from(Enquiry::tableName());
        return $this->_run_exception_query($unbuffered);
    }

    public function get_companies_without_venues($unbuffered)
    {
        $this->_company_select();
        $this->db->where(Venue::id_column());
        $this->_company_where();
        $this->_company_order();
        return $this->_run_exception_query($unbuffered);
    }

    public function get_companies_without_name($unbuffered)
    {
        $this->_company_select();
        $this->db->start_group_where(Company::column('name'), '');
        $this->db->or_where(Company::column('name'));
        $this->db->close_group_where();
        $this->_company_where();
        $this->_company_order();
        return $this->_run_exception_query($unbuffered);
    }

    public function get_venues_without_hours($unbuffered)
    {
        $this->_venue_select();
        $this->db->advanced_join(Venue::class, Opening_Hours::class, Venue::asset_id_column(false), Opening_Hours::column('asset_id', false));
        $this->db->where(Opening_Hours::column('asset_id'));
        $this->_venue_where();
        $this->_venue_order();
        return $this->_run_exception_query($unbuffered);
    }

    public function get_venues_without_cancellation($unbuffered)
    {
        $this->_venue_select();
        $this->db->advanced_join(Venue::class, Runt_Asset_Cancellation::class, Venue::asset_id_column(false), Runt_Asset_Cancellation::column('asset_id', false));
        $this->db->where(Runt_Asset_Cancellation::column('asset_id'));
        $this->_venue_where();
        $this->_venue_order();
        return $this->_run_exception_query($unbuffered);
    }

    public function get_venues_without_rooms($unbuffered)
    {
        $this->db->select(Venue::id_column() . " AS venue_id, " . Venue::column('name') . " AS venue_name, " . Venue::column('approved') . " AS venue_approved");
        $this->db->advanced_join(Venue::class, Room_Skeleton::class, Venue::id_column(false), Room_Skeleton::column('venue_id', false));
        $this->db->where(Room_Skeleton::column('id'));
        $this->_venue_where();
        $this->db->from(Venue::tableName());
        $this->_venue_order();
        return $this->_run_exception_query($unbuffered);
    }

    public function get_venues_without_any_image($unbuffered)
    {
        $this->_venue_select();
        $this->db->advanced_join(Venue::class, Image::class, Venue::asset_id_column(false), Image::column('subject_id', false));
        $this->db->where(Image::column('subject_id'));
        $this->_venue_where();
        $this->_venue_order();
        return $this->_run_exception_query($unbuffered);
    }

    public function get_venues_without_featured_image($unbuffered)
    {
        $this->db->select("SUM(" . Image::column('represents') . ") as image_sum, " . Venue::id_column() . " AS venue_id, " . Venue::column('name') . " AS venue_name, " . Venue::column('approved') . " AS venue_approved, COUNT(" . Room_Skeleton::id_column() . ") AS room_count, GROUP_CONCAT(" . Room_Skeleton::id_column() . " ORDER BY " . Room_Skeleton::id_column() . " ASC) AS room_ids");
        $this->db->advanced_join(Image::class, Venue::class, Image::column('subject_id', false), Venue::asset_id_column(false));
        $this->_include_room_count();
        $this->db->where(Image::enabled_column(), 1);
        $this->_venue_where();
        $this->db->group_by(Image::column('subject_id'));
        $this->db->having("image_sum", 0);
        $this->db->from(Image::tableName());
        $this->_venue_order();
        return $this->_run_exception_query($unbuffered);
    }

    public function get_venues_missing_vat_rate($unbuffered)
    {
        $this->_venue_select();
        $this->db->select(Venue::column('country') . " AS venue_country");
        $this->db->where(Venue::column('vat_rate_id'));
        $this->_venue_where();
        $this->_venue_order();
        return $this->_run_exception_query($unbuffered);
    }

    public function get_approved_rooms_in_unapproved_venue($unbuffered)
    {
        $this->db->select(Room_Skeleton::id_column() . " AS room_id, " . Room_Skeleton::column('title') . " AS room_name, " . Room_Skeleton::column('hidden') . " AS room_hidden, " . Venue::id_column() . " AS venue_id, " . Venue::column('name') . " AS venue_name");
        $this->db->advanced_join(Room_Skeleton::class, Venue::class, Room_Skeleton::column('venue_id', false), Venue::id_column(false), "INNER");
        $this->db->where(Room_Skeleton::column('approved'), 1);
        $this->_room_where();
        $this->db->where(Venue::column('approved'), 0);
        $this->_venue_where();
        $this->db->from(Room_Skeleton::tableName());
        $this->db->order_by(Room_Skeleton::column('title'), 'ASC');
        $this->db->order_by(Room_Skeleton::id_column(), 'ASC');
        return $this->_run_exception_query($unbuffered);
    }

    public function get_rooms_without_hours($unbuffered)
    {
        $this->_room_select();
        $this->db->advanced_join(Room_Skeleton::class, Opening_Hours::class, Room_Skeleton::asset_id_column(false), Opening_Hours::column('asset_id', false));
        $this->db->where(Opening_Hours::column('asset_id'));
        $this->_room_where();
        $this->_room_order();
        return $this->_run_exception_query($unbuffered);
    }

    public function get_rooms_without_configurations($unbuffered)
    {
        $this->_room_select();
        $this->db->advanced_join(Room_Skeleton::class, Runt_Room_Configuration::class, Room_Skeleton::asset_id_column(false), Runt_Room_Configuration::column('asset_id', false));
        $this->db->where(Runt_Room_Configuration::column('asset_id'));
        $this->_room_where();
        $this->_room_order();
        return $this->_run_exception_query($unbuffered);
    }

    public function get_rooms_without_any_image($unbuffered)
    {
        $this->_room_select();
        $this->db->advanced_join(Room_Skeleton::class, Image::class, Room_Skeleton::asset_id_column(false), Image::column('subject_id', false));
        $this->db->where(Image::column('subject_id'));
        $this->_room_where();
        $this->_room_order();
        return $this->_run_exception_query($unbuffered);
    }

    public function get_rooms_without_featured_image($unbuffered)
    {
        $this->db->select("SUM(" . Image::column('represents') . ") as image_sum, " . Room_Skeleton::id_column() . " AS room_id, " . Room_Skeleton::column('title') . " AS room_name, " . Room_Skeleton::column('approved') . " AS room_approved, " . Room_Skeleton::column('hidden') . " AS room_hidden, " . Venue::id_column() . " AS venue_id, " . Venue::column('name') . " AS venue_name, " . Venue::column('approved') . " AS venue_approved");
        $this->db->advanced_join(Image::class, Room_Skeleton::class, Image::column('subject_id', false), Room_Skeleton::asset_id_column(false));
        $this->db->advanced_join(Room_Skeleton::class, Venue::class, Room_Skeleton::column('venue_id', false), Venue::id_column(false), "INNER");
        $this->db->where(Image::enabled_column(), 1);
        $this->_room_where();
        $this->db->group_by(Image::column('subject_id'));
        $this->db->group_by(Room_Skeleton::id_column());
        $this->db->having("image_sum", 0);
        $this->db->from(Image::tableName());
        $this->_room_order();
        return $this->_run_exception_query($unbuffered);
    }

    public function get_venues_without_commissions($unbuffered)
    {
        $this->_venue_select();
        $this->db->advanced_join(Venue::class, Asset_Commission::class, Venue::asset_id_column(false), Asset_Commission::column('asset_id', false));
        $this->db->where(Asset_Commission::column('asset_id'));
        $this->_venue_where();
        $this->_venue_order();
        return $this->_run_exception_query($unbuffered);
    }

    public function get_paid_reservations_without_date($unbuffered)
    {
        $this->db->select(Reservation::id_column() . " AS reservation_id");
        $this->db->advanced_join(Reservation::class, Reservation_Venue_Payment::class, Reservation::id_column(false), Reservation_Venue_Payment::column('reservation_id', false));
        $this->db->where(Reservation::column('is_paid'), 1);
        $this->db->where(Reservation_Venue_Payment::column('date_time'));
        $this->db->from(Reservation::tableName());
        return $this->_run_exception_query($unbuffered);
    }

    public function get_payout_diff_venue_payments($unbuffered)
    {
        $query = "SELECT reservation_id, venue_id, venue_name, payoutAmo, totAmo, (payoutAmo - totAmo) AS diffAmount FROM"
            . " (SELECT " . Reservation::id_column() . " AS reservation_id, " . Venue::id_column() . " AS venue_id, " . Venue::column('name') . " AS venue_name, " . Reservation::column('toVenue') . " - (CASE WHEN " . Reservation::column('toVenue_vat') . " IS NOT NULL THEN " . Reservation::column('toVenue_vat') . " ELSE 0 END) AS payoutAmo, totAmo FROM " . Reservation::tableName() . ""
            . " INNER JOIN (SELECT SUM(" . Reservation_Venue_Payment::column('amount') . ") AS totAmo, " . Reservation_Venue_Payment::column('reservation_id') . " AS reservation_id FROM " . Reservation_Venue_Payment::tableName() . ""
            . " GROUP BY " . Reservation_Venue_Payment::column('reservation_id') . ") alias ON " . Reservation::id_column() . "=alias.reservation_id"
            . " INNER JOIN " . Room_Skeleton::tableName() . " ON " . Reservation::column('asset_id') . "=" . Room_Skeleton::asset_id_column() . ""
            . " INNER JOIN " . Venue::tableName() . " ON " . Room_Skeleton::column('venue_id') . "=" . Venue::id_column() . ""
            . " WHERE " . Reservation::enabled_column() . " = 1"
            . " HAVING ROUND(payoutAmo, 2) <> ROUND(totAmo, 2)) alias2"
            . " ORDER BY alias2.venue_name";
        return $this->_run_exception_query($unbuffered, false, $query);
    }

    public function get_reservations_with_different_payments($unbuffered)
    {
        $query = "SELECT reservation_id, reservation_price, paymentAmount, (reservation_price - paymentAmount) AS diffAmount FROM"
            . " (SELECT " . Reservation::id_column() . " AS reservation_id, ROUND(SUM(" . Reservation::column('price') . " + (CASE WHEN " . Reservation::column('extra_fee') . " IS NULL THEN 0 ELSE " . Reservation::column('extra_fee') . " END) + (CASE WHEN " . Reservation::column('extra_fee_vat') . " IS NULL THEN 0 ELSE " . Reservation::column('extra_fee_vat') . " END) + (CASE WHEN " . Reservation::column('flexible_fee') . " IS NULL THEN 0 ELSE " . Reservation::column('flexible_fee') . " END) + (CASE WHEN " . Reservation::column('flexible_fee_vat') . " IS NULL THEN 0 ELSE " . Reservation::column('flexible_fee_vat') . " END) + (CASE WHEN " . Reservation::column('price_control_fee') . " IS NULL THEN 0 ELSE " . Reservation::column('price_control_fee') . " END) + (CASE WHEN " . Reservation::column('price_control_fee_vat') . " IS NULL THEN 0 ELSE " . Reservation::column('price_control_fee_vat') . " END)), 2) AS reservation_price, ROUND(alias.paymentAmount, 2) AS paymentAmount FROM " . Reservation::tableName() . ""
            . " INNER JOIN (SELECT (CASE WHEN payment_count IS NOT NULL THEN SUM((CASE WHEN " . Payment::column('payment_status_id') . " = " . Payment_Status::REFUND . " THEN -1 ELSE 1 END) * payments.amount)/payment_count ELSE SUM((CASE WHEN " . Payment::column('payment_status_id') . " = " . Payment_Status::REFUND . " THEN -1 ELSE 1 END) * payments.amount) END) AS paymentAmount, " . Payment::column('booking_id') . " AS booking_id FROM " . Payment::tableName() . " LEFT JOIN (SELECT COUNT(" . Payment::column('external_reference') . ") AS payment_count, " . Payment::column('external_reference') . " AS external_reference FROM " . Payment::tableName() . " WHERE " . Payment::column('payment_type_id') . " = " . Payment_Type::BRAINTREE . " AND " . Payment::enabled_column() . " = 1 AND " . Payment::column('payment_status_id') . " <> " . Payment_Status::VOID . " GROUP BY " . Payment::column('external_reference') . " HAVING COUNT(" . Payment::column('external_reference') . ") > 1) multi_payment ON multi_payment.external_reference = " . Payment::column('external_reference') . " WHERE " . Payment::enabled_column() . " = 1 AND " . Payment::column('payment_status_id') . " <> " . Payment_Status::VOID . " GROUP BY " . Payment::column('booking_id') . ") alias ON alias.booking_id=" . Reservation::column('booking_id') . ""
            . " WHERE " . Reservation::column('reservationStatus_id') . " NOT IN (" . Reservation_Status::EXPIRED . "," . Reservation_Status::DECLINE . "," . Reservation_Status::CANCELLEDBYHOST . "," . Reservation_Status::CANCELLEDBYUSER . ")"
            . " AND " . Reservation::enabled_column() . " = 1"
            . " GROUP BY " . Reservation::id_column() . ""
            . " HAVING ROUND(reservation_price, 2) <> ROUND(paymentAmount, 2)) alias2";
        return $this->_run_exception_query($unbuffered, false, $query);
    }

    public function get_assets_without_owner($unbuffered)
    {
        $this->db->select(Asset_Audit::column('reference_id') . " AS ref_id, " . Asset_Type::column('asset_type') . " AS asset_type, " . Venue::column('name') . " AS venue_name, " . Room_Skeleton::column('title') . " AS room_name");
        $this->db->advanced_join(Asset_Audit::class, Asset_Type::class, Asset_Audit::column('asset_type', false), Asset_Type::id_column(false));
//        $this->db->advanced_join(Asset_Audit::class, Company::class, Asset_Audit::id_column(false), Company::asset_id_column(false)); //hide companies for now
        $this->db->advanced_join(Asset_Audit::class, Venue::class, Asset_Audit::id_column(false), Venue::asset_id_column(false));
        $this->db->advanced_join(Asset_Audit::class, Room_Skeleton::class, Asset_Audit::id_column(false), Room_Skeleton::asset_id_column(false));
        $this->db->advanced_join(Asset_Audit::class, Runt_User_Asset_Privilege::class, Asset_Audit::id_column(false), Runt_User_Asset_Privilege::column('asset_id', false));
        $this->db->where(Runt_User_Asset_Privilege::column('asset_id'));
        $this->db->where(Asset_Audit::column('asset_type') . " <> " . Asset_Type::COMPANY); //hide companies for now
        $this->db->order_by(Asset_Audit::column('asset_type'), 'ASC');
        $this->db->order_by(Venue::column('name'), 'ASC');
        $this->db->order_by(Venue::id_column(), 'ASC');
        $this->db->order_by(Room_Skeleton::column('title'), 'ASC');
        $this->db->order_by(Room_Skeleton::id_column(), 'ASC');
        $this->db->from(Asset_Audit::tableName());
        return $this->_run_exception_query($unbuffered);
    }

    public function get_users_without_profile($unbuffered)
    {
        $this->_user_select();
        $this->db->where(Profile::id_column());
        return $this->_run_exception_query($unbuffered);
    }

    public function get_users_with_privileges_non_assetowner($unbuffered)
    {
        $this->_user_select();
        $this->db->select(Asset_Audit::column('reference_id') . " AS ref_id, " . Asset_Type::column('asset_type') . " AS asset_type, " . Venue::column('name') . " AS venue_name, " . Room_Skeleton::column('title') . " AS room_name");
        $this->db->advanced_join(User::class, Runt_User_Asset_Privilege::class, User::id_column(false), Runt_User_Asset_Privilege::column('user_id', false), "INNER");
        $this->db->advanced_join(Runt_User_Asset_Privilege::class, Asset_Audit::class, Runt_User_Asset_Privilege::column('asset_id', false), Asset_Audit::id_column(false));
        $this->db->advanced_join(Asset_Audit::class, Asset_Type::class, Asset_Audit::column('asset_type', false), Asset_Type::id_column(false));
//        $this->db->advanced_join(Asset_Audit::class, Company::class, Asset_Audit::id_column(false), Company::asset_id_column(false)); //hide companies for now
        $this->db->advanced_join(Asset_Audit::class, Venue::class, Asset_Audit::id_column(false), Venue::asset_id_column(false));
        $this->db->advanced_join(Asset_Audit::class, Room_Skeleton::class, Asset_Audit::id_column(false), Room_Skeleton::asset_id_column(false));
        $this->db->where(Asset_Audit::column('asset_type') . " <> " . Asset_Type::COMPANY); //hide companies for now
        $this->db->where(User::column('user_type_id') . ' <>', User::ASSETOWNER);
        $this->db->order_by(User::column('email'), 'ASC');
        $this->db->order_by(Asset_Audit::column('asset_type'), 'ASC');
        $this->db->order_by(Venue::column('name'), 'ASC');
        $this->db->order_by(Venue::id_column(), 'ASC');
        $this->db->order_by(Room_Skeleton::column('title'), 'ASC');
        $this->db->order_by(Room_Skeleton::id_column(), 'ASC');
        return $this->_run_exception_query($unbuffered);
    }

    public function get_reviewed_venues_without_reviews($unbuffered)
    {
        $this->db->distinct();
        $this->_venue_select();
        $this->db->advanced_join(Venue::class, Room_Skeleton::class, Venue::id_column(false), Room_Skeleton::column('venue_id', false), "LEFT", null, "room_review");
        $this->db->advanced_join(Room_Skeleton::class, Review::class, Room_Skeleton::asset_id_column(false), Review::column('subject_id', false), "room_review");
        $this->db->start_group_where(Venue::column('review_count'), 0);
        $this->db->or_where(Venue::column('review_score'));
        $this->db->close_group_where();
        $this->db->where(Review::column('subject_id') . " IS NOT NULL");
        $this->_venue_where();
        $this->_venue_order();
        return $this->_run_exception_query($unbuffered);
    }

    public function get_venues_same_location($unbuffered)
    {
        $query = "SELECT " . Venue::id_column() . " AS venue_id, " . Venue::column('name') . " AS venue_name, " . Venue::column('long') . " AS venue_long, " . Venue::column('lat') . " AS venue_lat, " . Venue::column('approved') . " AS venue_approved, COUNT(" . Room_Skeleton::id_column() . ") AS room_count, GROUP_CONCAT(" . Room_Skeleton::id_column() . " ORDER BY " . Room_Skeleton::id_column() . " ASC) AS room_ids FROM " . Venue::tableName() . ""
            . " INNER JOIN (SELECT COUNT(" . Venue::id_column() . "), " . Venue::column('long') . " AS venuelong, " . Venue::column('lat') . " AS venuelat FROM " . Venue::tableName() . " WHERE " . Venue::column('company_id') . " <> 0 AND " . Venue::enabled_column() . " = 1"
            . " GROUP BY " . Venue::column('long') . ", " . Venue::column('lat') . ""
            . " HAVING COUNT(" . Venue::id_column() . ") > 1) alias"
            . " ON " . Venue::column('long') . " = alias.venuelong AND " . Venue::column('lat') . " = alias.venuelat"
            . " LEFT JOIN " . Room_Skeleton::tableName() . " ON " . Room_Skeleton::column('venue_id') . "=" . Venue::id_column() . " AND " . Room_Skeleton::enabled_column() . " = 1"
            . " WHERE " . Venue::column('company_id') . " <> 0 AND " . Venue::enabled_column() . " = 1"
            . " GROUP BY " . Venue::id_column() . ""
            . " ORDER BY " . Venue::column('long') . ", " . Venue::column('lat') . ", " . Venue::column('approved') . " DESC";
        return $this->_run_exception_query($unbuffered, false, $query);
    }

    public function get_venues_same_room_names($unbuffered)
    {
        $this->_venue_select();
        $this->db->select(Room_Skeleton::column('title') . " AS room_name");
        $this->_venue_where();
        $this->db->having('room_count > 1');
        $this->db->group_by(Room_Skeleton::column('title'));
        $this->db->order_by(Venue::column('approved'), 'DESC');
        $this->db->order_by(Venue::column('name'), 'ASC');
        $this->db->order_by(Venue::id_column(), 'ASC');
        return $this->_run_exception_query($unbuffered);
    }

    public function get_unenabled_user_asset_permission($unbuffered)
    {
        $this->_user_select();
        $this->db->select(Asset_Audit::column('reference_id') . " AS ref_id, " . Asset_Type::column('asset_type') . " AS asset_type, " . Venue::column('name') . " AS venue_name, " . Room_Skeleton::column('title') . " AS room_name");
        $this->db->advanced_join(User::class, Runt_User_Asset_Privilege::class, User::id_column(false), Runt_User_Asset_Privilege::column('user_id', false), "INNER");
        $this->db->advanced_join(Runt_User_Asset_Privilege::class, Asset_Audit::class, Runt_User_Asset_Privilege::column('asset_id', false), Asset_Audit::id_column(false));
        $this->db->advanced_join(Asset_Audit::class, Asset_Type::class, Asset_Audit::column('asset_type', false), Asset_Type::id_column(false));
//        $this->db->advanced_join(Asset_Audit::class, Company::class, Asset_Audit::id_column(false), Company::asset_id_column(false)); //hide companies for now
        $this->db->advanced_join(Asset_Audit::class, Venue::class, Asset_Audit::id_column(false), Venue::asset_id_column(false));
        $this->db->advanced_join(Asset_Audit::class, Room_Skeleton::class, Asset_Audit::id_column(false), Room_Skeleton::asset_id_column(false));
        $this->db->where(Asset_Audit::column('asset_type') . " <> " . Asset_Type::COMPANY); //hide companies for now
        $this->db->where(User::enabled_column(), 0);
        $this->db->order_by(User::column('email'), 'ASC');
        $this->db->order_by(Asset_Audit::column('asset_type'), 'ASC');
        $this->db->order_by(Venue::column('name'), 'ASC');
        $this->db->order_by(Venue::id_column(), 'ASC');
        $this->db->order_by(Room_Skeleton::column('title'), 'ASC');
        $this->db->order_by(Room_Skeleton::id_column(), 'ASC');
        return $this->_run_exception_query($unbuffered);
    }

    public function get_unenabled_user_asset_main_contact($unbuffered)
    {
        $this->_user_select();
        $this->db->select(Venue::id_column() . " AS venue_id, " . Venue::column('name') . " AS venue_name, " . Venue::column('approved') . " AS venue_approved");
        $this->db->advanced_join(User::class, Venue::class, User::id_column(false), Venue::column('main_contact', false), "INNER");
        $this->db->where(User::enabled_column(), 0);
        $this->db->order_by(User::column('email'), 'ASC');
        $this->_venue_order();
        return $this->_run_exception_query($unbuffered);
    }

    private function _run_exception_query($unbuffered, $get = true, $query = '')
    {
        if ($unbuffered)
        {
            if ($get)
            {
                return $this->db->get_unbuffered_get();
            }
            return $this->db->get_unbuffered_query($query);
        }
        elseif ($get)
        {
            return $this->db->get();
        }
        else
        {
            return $this->db->query($query);
        }
    }

    private function _user_select()
    {
        $this->db->select(User::id_column() . " AS user_id, " . Profile::column('first_name') . " AS user_firstname, " . Profile::column('last_name') . " AS user_lastname, " . User::column('email') . " AS user_email");
        $this->db->advanced_join(User::class, Profile::class, User::id_column(false), Profile::column('user_id', false));
        $this->db->from(User::tableName());
    }

    private function _company_select()
    {
        $this->db->select(Company::id_column() . " AS company_id, " . Company::column('name') . " AS company_name, COUNT(" . Venue::id_column() . ") AS venue_count, GROUP_CONCAT(" . Venue::id_column() . " ORDER BY " . Venue::id_column() . " ASC) AS venue_ids");
        $this->db->join(Venue::tableName(), Company::id_column() . "=" . Venue::column('company_id') . " AND " . Venue::enabled_column() . " = 1", "LEFT");
        $this->db->group_by(Company::id_column());
        $this->db->from(Company::tableName());
    }

    private function _company_where()
    {
        $this->db->where(Company::enabled_column(), 1);
    }

    private function _company_order()
    {
        $this->db->order_by(Company::column('name'), 'ASC');
        $this->db->order_by(Company::id_column(), 'ASC');
    }

    private function _include_room_count()
    {
        $this->db->join(Room_Skeleton::tableName(), Venue::id_column() . "=" . Room_Skeleton::column('venue_id') . " AND " . Room_Skeleton::enabled_column() . " = 1", "LEFT");
        $this->db->group_by(Venue::id_column());
    }

    private function _venue_select()
    {
        $this->db->select(Venue::id_column() . " AS venue_id, " . Venue::column('name') . " AS venue_name, " . Venue::column('approved') . " AS venue_approved, COUNT(" . Room_Skeleton::id_column() . ") AS room_count, GROUP_CONCAT(" . Room_Skeleton::id_column() . " ORDER BY " . Room_Skeleton::id_column() . " ASC) AS room_ids");
        $this->_include_room_count();
        $this->db->from(Venue::tableName());
    }

    private function _venue_where()
    {
        $this->db->where(Venue::enabled_column(), 1);
    }

    private function _venue_order()
    {
        $this->db->order_by(Venue::column('approved'), 'DESC');
        $this->db->order_by(Venue::column('name'), 'ASC');
        $this->db->order_by(Venue::id_column(), 'ASC');
    }

    private function _room_select()
    {
        $this->db->select(Room_Skeleton::id_column() . " AS room_id, " . Room_Skeleton::column('title') . " AS room_name, " . Room_Skeleton::column('approved') . " AS room_approved, " . Room_Skeleton::column('hidden') . " AS room_hidden, " . Venue::id_column() . " AS venue_id, " . Venue::column('name') . " AS venue_name, " . Venue::column('approved') . " AS venue_approved");
        $this->db->advanced_join(Room_Skeleton::class, Venue::class, Room_Skeleton::column('venue_id', false), Venue::id_column(false), "INNER");
        $this->db->from(Room_Skeleton::tableName());
    }

    private function _room_where()
    {
        $this->db->where(Room_Skeleton::enabled_column(), 1);
    }

    private function _room_order()
    {
        $this->db->order_by(Room_Skeleton::column('approved'), 'DESC');
        $this->db->order_by(Room_Skeleton::column('title'), 'ASC');
        $this->db->order_by(Room_Skeleton::id_column(), 'ASC');
    }
}