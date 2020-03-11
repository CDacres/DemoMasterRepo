<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Model__import_calendar extends Model_Base__Unbound
{
    public function get_base_object_by_constraints($constraintArray)
    {
        return new Base__Null();
    }

    public function get_base_object_by_id($id, $userRequested = false)
    {
        return new Base__Null();
    }

    protected function _user_can_insert(Import_Calendar $object)
    {
        if ($this->user_is_admin())
        {
            return true;
        }
    }

    public function insert_update($object, $userRequested = false)
    {
        if (!$this->_user_can_insert($object))
        {
            throw new Exception("Only admins can currently import calendars");
        }
        $assetId = $object->get('asset_id');
        $path = APPPATH . '../imported_calendars/' . $assetId;
        if (!is_dir($path))
        {
            mkdir($path, 0777, true);
        }
        $this->load->library('upload', [
            'allowed_types' => '*',
            'upload_path' => $path,
            'encrypt_name' => true,
            'remove_spaces' => true
        ]);
        if (!$this->upload->do_upload("zc_calendar_import"))
        {
            throw new Exception($this->upload->display_errors('', ''));
        }
        else
        {
            $fileData = $this->upload->data();
            $this->load->library('ICal');
            $this->ical->initLines(file($fileData['full_path'], FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES));
            if ($this->ical->hasEvents())
            {
                $filename = explode('.', $fileData['file_name']);
                return $this->_insert_events($assetId, $this->ical->events(), $filename[0]);
            }
            else
            {
                throw new Exception("This calendar contained no events. Please check and try again.");
            }
        }
    }

    private function _insert_events($assetId, $events, $filename)
    {
        $versionNumber = 'v1.3';
        $parsedVersionNumber = str_replace('.', '_', $versionNumber);
        $resCollection = new Reservation___Collection();
        $importId = 'cal_import_' . $parsedVersionNumber . '_' . $filename;
        foreach ($events as $event)
        {
            $resCollection->add_object($this->_generate_reservation($assetId, $event, $importId));
        }
        $resModel = Model__reservations::class;
        $this->load->model($resModel);
        $this->$resModel->insert_update($resCollection);
        return $resCollection;
    }

    private function _generate_reservation($assetId, $event, $importId)
    {
        $res = new Reservation();
        $res->set('asset_id', $assetId);
        $title = "Imported";
        if (isset($event['SUMMARY']))
        {
            $title = $event['SUMMARY'];
        }
        $res->set('title', $title);
        if (isset($event['DESCRIPTION']))
        {
            $res->set('comments', $event['DESCRIPTION']);
        }
        $res->set('reservationStatus_id', Reservation_Status::BLOCKED);
        $res->set('batch_id', $importId);
        $period = new Booked_Period();
        $period->set_start_from_unixtime($this->ical->iCalDateToUnixTimestamp($event['DTSTART']));
        $period->set_end_from_unixtime($this->ical->iCalDateToUnixTimestamp($event['DTEND']));
        $period->set_appropriate_all_day_flag();
        $period->set('asset_id', $assetId);
        $res->set('period', $period);
        return $res;
    }
}