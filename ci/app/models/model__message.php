<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');
/**
 * Zipcube Message_model Class
 *
 * Help to handle tables related to static Faqs of the system.
 *
 * @package		Message
 * @subpackage	Models
 * @category	Message_model
 * @author		Zipcube Product Team
 * @version		Version 1.5
 * @link		www.zipcube.com

 */
class Model__message extends Model_Base__Object
{
    use Trait__Currency_Handler;

    function __construct()
    {
        $this->_set_base_class(Message::class);
        parent::__construct();
    }

    protected function _user_can_insert($object)
    {
        return $this->_user_sends($object);
    }

    protected function _user_can_select($object)
    {
        return $this->_user_receives($object) || $this->_user_sends($object);
    }

    protected function _user_can_update($object)
    {
        return $this->_user_receives($object);
    }

    private function _user_receives($object)
    {
        $user = $this->get_user();
        return $object->get('receiving_user_id') === $user->get('id');
    }

    private function _user_sends($object)
    {
        $user = $this->get_user();
        return $object->get('sending_user_id') == $user->get('id');
    }

    protected function _pre_insert($object)
    {
        $object->set('created', date("Y-m-d H:i:s"));
        if ($object->is_conversation())
        {
            $conversationId = $this->_get_message_conversation_id($object);
            if ($conversationId == 0)
            {
                $conversationId = $this->_get_next_conversation_id();
            }
            $object->set('conversation_id', $conversationId);
        }
    }

    protected function _post_insert($object)
    {
        if ($object->is_conversation() && $object->get('message_type') == Message_Type::CONVERSATION)
        {
            $modelComms = Model__comms::class;
            $this->load->model($modelComms);
            $this->$modelComms->new_conversation_message($object);
            $this->load->helper('analytics');
            $analytics_helper = new Analytics_Helper();
            $analytics_helper->register_tracking_event('VOLUNTARY_INTERACTION', ['User added message']);
        }
    }

    public function get_message_object_by_id($id)
    {
        return new Message($this->_get_message_by_id($id));
    }

    private function _get_message_by_id($id)
    {
        $this->db->where(Message::id_column(), $id);
        return $this->_query_init_and_run();
    }

    public function get_users_messages_collection($id, $limit = null)
    {
        $this->_get_messages();
        $this->db->where(Message::column('receiving_user_id'), $id);
        if ($limit != null)
        {
            $this->db->limit($limit);
        }
        return new Message___Collection($this->_query_init_and_run(false));
    }

    public function get_conversation_messages_collection($conversation_id)
    {
        $this->_get_messages();
        $this->db->where(Message::column('conversation_id'), $conversation_id);
        $this->db->start_group_where(Message::column('sending_user_id'), $this->dx_auth->get_user_id());
        $this->db->or_where(Message::column('receiving_user_id'), $this->dx_auth->get_user_id());
        $this->db->close_group_where();
        return new Message___Collection($this->_query_init_and_run(false));
    }

    public function get_messages_collection_by_reservation_id($reservation_id)
    {
        $this->_get_messages();
        $this->db->where(Message::column('reservation_id'), $reservation_id);
        return new Message___Collection($this->_query_init_and_run(false));
    }

    private function _get_messages()
    {
        $userbyTableAlias = "users_userby";
        $userbyProfileAlias = "users_userby_profile";
        $usertoTableAlias = "users_userto";
        $usertoProfileAlias = "users_userto_profile";
        $userBooking = "users_booker";
        $this->db->count_rows(true);
        $this->db->advanced_join(Message::class, User::class, Message::column('sending_user_id', false), User::id_column(false), "LEFT", NULL, $userbyTableAlias);
        $this->db->advanced_join(User::class, Profile::class, User::id_column(false), Profile::column('user_id', false), "LEFT", $userbyTableAlias, $userbyProfileAlias);
        $this->db->advanced_join(Message::class, User::class, Message::column('receiving_user_id', false), User::id_column(false), "LEFT", NULL, $usertoTableAlias);
        $this->db->advanced_join(User::class, Profile::class, User::id_column(false), Profile::column('user_id', false), "LEFT", $usertoTableAlias, $usertoProfileAlias);
        $this->db->advanced_join(Message::class, Message_Type::class, Message::column('message_type', false), Message_Type::id_column(false), "INNER");
        $this->db->advanced_join(Message::class, Reservation::class, Message::column('reservation_id', false), Reservation::id_column(false));
        $this->db->allow_join_disabled();
        $this->db->advanced_join(Reservation::class, Simple_Room::class, Reservation::column('asset_id', false), Simple_Room::asset_id_column(false));
        $this->db->advanced_join(Simple_Room::class, Venue::class, Simple_Room::column('venue_id', false), Venue::id_column(false), "INNER");
        $this->db->disallow_join_disabled();
        $this->db->advanced_join(Simple_Room::class, Usage::class, Simple_Room::column('usage_id', false), Usage::id_column(false));
        $this->db->advanced_join(Usage::class, Runt_Usage_UsageSuperset::class, Usage::id_column(false), Runt_Usage_UsageSuperset::column('usage_id', false));
        $this->db->advanced_join(Runt_Usage_UsageSuperset::class, UsageSuperset::class, Runt_Usage_UsageSuperset::column('usage_superset_id', false), UsageSuperset::id_column(false));
        $this->_query_join_currencies(Reservation::class, Reservation::column('currency', false), [
            'left' => 'currency_symbol_left',
            'right' => 'currency_symbol_right'
        ]);
        $this->db->allow_join_disabled();
        $this->db->advanced_join(Reservation::class, Booked_Period::class, Reservation::id_column(false), Booked_Period::column('reservation_id', false));
        $this->db->advanced_join(Reservation::class, Booking::class, Reservation::column('booking_id', false), Booking::id_column(false));
        $this->db->advanced_join(Booking::class, User::class, Booking::column('beneficiary_id', false), User::id_column(false), "LEFT", NULL, $userBooking);
        $this->db->join(Runt_User_Asset_Member::tableName(), Simple_Room::asset_id_column() . "=" . Runt_User_Asset_Member::column('asset_id') . " AND " . User::id_column(false, $userBooking) . "=" . Runt_User_Asset_Member::column('user_id'), "LEFT");
        $this->db->disallow_join_disabled();
        $this->db->select_alias(Profile::column('first_name', true, $userbyProfileAlias), Message::alias('sending_user_first_name'));
        $this->db->select_alias(Profile::column('last_name', true, $userbyProfileAlias), Message::alias('sending_user_last_name'));
        $this->db->select_alias(Profile::column('first_name', true, $usertoProfileAlias), Message::alias('receiving_user_first_name'));
        $this->db->select_alias(Profile::column('last_name', true, $usertoProfileAlias), Message::alias('receiving_user_last_name'));
        $this->db->select_alias(Simple_Room::asset_id_column(), Message::alias('asset_id'));
        $this->db->select_alias(Simple_Room::id_column(), Message::alias('room_id'));
        $this->db->select_alias(Simple_Room::column('title'), Message::alias('room_name'));
        $this->db->select_alias(Simple_Room::column('approved'), Message::alias('room_approved'));
        $this->db->select_alias(Simple_Room::enabled_column(), Message::alias('room_enabled'));
        $this->db->select_alias(Venue::column('name'), Message::alias('venue_name'));
        $this->db->select_alias(Venue::column('city'), Message::alias('venue_city'));
        $this->db->select_alias(Venue::column('country'), Message::alias('venue_country'));
        $this->db->select_alias(Venue::column('country_code'), Message::alias('venue_country_code'));
        $this->db->select_alias(Venue::column('approved'), Message::alias('venue_approved'));
        $this->db->select_alias(Venue::enabled_column(), Message::alias('venue_enabled'));
        $this->db->select_alias(Message_Type::column('name'), Message::alias('name'));
        $this->db->select_alias(Message_Type::column('url'), Message::alias('url'));
        $this->db->select_alias(Booked_Period::column('start'), Message::alias('start_date_time'));
        $this->db->select_alias(Booked_Period::column('end'), Message::alias('end_date_time'));
        $this->db->select_alias(Reservation::column('toVenue'), Message::alias('toVenue'));
        $this->db->select_alias(Reservation::column('toVenue_vat'), Message::alias('toVenue_vat'));
        $this->db->select_alias(Reservation::column('price'), Message::alias('price'));
        $this->db->select_alias(Reservation::column('extra_fee'), Message::alias('extra_fee'));
        $this->db->select_alias(Reservation::column('extra_fee_vat'), Message::alias('extra_fee_vat'));
        $this->db->select_alias(Reservation::column('price_control_fee'), Message::alias('price_control_fee'));
        $this->db->select_alias(Reservation::column('price_control_fee_vat'), Message::alias('price_control_fee_vat'));
        $this->db->select_alias(Reservation::column('flexible_fee'), Message::alias('flexible_fee'));
        $this->db->select_alias(Reservation::column('flexible_fee_vat'), Message::alias('flexible_fee_vat'));
        $this->db->select_alias(Reservation::column('discount_applied'), Message::alias('discount_applied'));
        $this->db->select_alias(Runt_User_Asset_Member::column('discount'), Message::alias('client_discount'));
        $this->db->select_alias(Reservation::column('guests'), Message::alias('guests'));
        $this->db->select_alias(UsageSuperset::column('alias'), Message::alias('usage_superset_alias'));
        $this->db->nullable_where(UsageSuperset::column('hidden'), 0);
        $this->db->group_by(Message::id_column());
        $this->db->order_by(Message::id_column(), 'DESC');
    }

    public function get_count_of_message_type()
    {
        $this->db->select('COUNT(DISTINCT ' . Message::id_column() . ') AS message_count, ' . Message_Type::column('name'));
        $this->db->advanced_join(Message::class, Message_Type::class, Message::column('message_type', false), Message_Type::id_column(false), "INNER");
        $this->db->advanced_join(Message::class, Reservation::class, Message::column('reservation_id', false), Reservation::id_column(false), "INNER");
        $this->db->where(Message::column('receiving_user_id'), $this->dx_auth->get_user_id());
        $this->db->where(Message::enabled_column(), 1);
        $this->db->group_by(Message_Type::column('name'));
        $this->db->from(Message::tableName());
        return $this->db->get();
    }

    public function get_count_of_unread_messages()
    {
        $this->db->select('COUNT(DISTINCT ' . Message::id_column() . ') AS message_count');
        $this->db->advanced_join(Message::class, Message_Type::class, Message::column('message_type', false), Message_Type::id_column(false), "INNER");
        $this->db->advanced_join(Message::class, Reservation::class, Message::column('reservation_id', false), Reservation::id_column(false), "INNER");
        $this->db->where(Message::column('receiving_user_id'), $this->dx_auth->get_user_id());
        $this->db->where(Message::enabled_column(), 1);
        $this->db->where(Message::column('is_read'), 0);
        $this->db->from(Message::tableName());
        $query = $this->db->get()->row();
        return $query->message_count;
    }

    public function get_conversation_by_reservation_id($reservation_id)
    {
        $conversationId = null;
        $this->db->select_max(Message::column('conversation_id'), Message::alias('max_conversation_id'));
        $this->db->where(Message::column('reservation_id'), $reservation_id);
        $this->db->start_group_where(Message::column('sending_user_id'), $this->dx_auth->get_user_id());
        $this->db->or_where(Message::column('receiving_user_id'), $this->dx_auth->get_user_id());
        $this->db->close_group_where();
        $this->db->from(Message::tableName());
        $query = $this->db->get();
        if ($query->num_rows() > 0)
        {
            $conversationId = $query->row()->max_conversation_id;
        }
        return $conversationId;
    }

    private function _get_message_conversation_id($message)
    {
        $sendingUserId = $message->get('sending_user_id');
        $receivingUserId = $message->get('receiving_user_id');
        $this->db->select_max(Message::column('conversation_id'), Message::alias('max_conversation_id'));
        $this->db->start_group_where(Message::column('sending_user_id'), $sendingUserId);
        $this->db->where(Message::column('receiving_user_id'), $receivingUserId);
        $this->db->close_group_where();
        $this->db->start_group_where(Message::column('sending_user_id'), $receivingUserId, true, "OR");
        $this->db->where(Message::column('receiving_user_id'), $sendingUserId);
        $this->db->close_group_where();
        $this->db->from(Message::tableName());
        $query = $this->db->get();
        if ($query->num_rows() > 0)
        {
            $conversationId = $query->row()->max_conversation_id;
        }
        else
        {
            $conversationId = 0;
        }
        return $conversationId;
    }

    private function _get_next_conversation_id()
    {
        $this->db->select_max(Message::column('conversation_id'), Message::alias('max_conversation_id'));
        $this->db->from(Message::tableName());
        $query = $this->db->get();
        if ($query->num_rows() > 0)
        {
            $conversationId = $query->row()->max_conversation_id + 1;
        }
        else
        {
            $conversationId = 0;
        }
        return $conversationId;
    }
}