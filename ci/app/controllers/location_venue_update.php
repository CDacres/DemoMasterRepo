<?php

class Location_Venue_Update extends Controller_Base__Public
{
    public function location_update($hash = null)
    {
        if ($hash == 'ae2c8899a42cd69c52ab7f57eaaeeabf')
        {
            $this->load->library('GoogleGeocodeAPI');
            $modelLocations = Model__locations::class;
            $this->load->model($modelLocations);
            $locations = $this->$modelLocations->get_wrong_places();
            foreach ($locations->object() as $location)
            {
                $response = $this->googlegeocodeapi->address_geocode($location->get('human_desc'));
                if (isset($response['results']) && count($response['results']) > 0)
                {
                    $retLocation = $response['results'][0];
                    if (isset($retLocation['place_id']))
                    {
                        $location->set('place_id', $retLocation['place_id']);
                        $this->$modelLocations->insert_update($location);
                    }
                }
            }
        }
        else
        {
            redirect('/');
        }
    }

    public function venue_update_extras($hash = null)
    {
        if ($hash == 'ae2c8899a42cd69c52ab7f57eaaeeabf')
        {
            $modelVenues = Model__venues::class;
            $this->load->model($modelVenues);
            $venues = $this->$modelVenues->get_venue_object_collection_without_location_data(true, 3);
            if ($venues->exists_in_db())
            {
                $this->load->library('GoogleGeocodeAPI');
                foreach ($venues->object() as $venue)
                {
                    $somethingtoChange = false;
                    if (!$venue->is_null('address'))
                    {
                        $response = $this->googlegeocodeapi->address_geocode($venue->get('address'));
                    }
                    elseif (!$venue->is_null('lat') && !$venue->is_null('long'))
                    {
                        $response = $this->googlegeocodeapi->latlng_geocode($venue->get('lat'), $venue->get('long'));
                    }
                    if (isset($response['results']) && count($response['results']) > 0)
                    {
                        $location = $response['results'][0];
                        if (isset($location['address_components']))
                        {
                            $location_obj = [];
                            $address_components = $location['address_components'];
                            foreach ($address_components as $address_component)
                            {
                                $types = $address_component['types'];
                                if (in_array('street_number', $types))
                                {
                                    $location_obj['street_number'] = $address_component['long_name'];
                                }
                                elseif (in_array('route', $types))
                                {
                                    $location_obj['road'] = $address_component['long_name'];
                                }
                                elseif (in_array('postal_town', $types))
                                {
                                    $location_obj['town'] = $address_component['long_name'];
                                }
                                elseif (in_array('administrative_area_level_2', $types))
                                {
                                    $location_obj['county'] = $address_component['long_name'];
                                }
                                elseif (in_array('postal_code', $types))
                                {
                                    $location_obj['post_code'] = $address_component['long_name'];
                                }
                            }
                            if ($venue->is_null('street_number') && isset($location_obj['street_number']))
                            {
                                $somethingtoChange = true;
                                $venue->set('street_number', $location_obj['street_number']);
                            }
                            if ($venue->is_null('road') && isset($location_obj['road']))
                            {
                                $somethingtoChange = true;
                                $venue->set('road', $location_obj['road']);
                            }
                            if ($venue->is_null('town'))
                            {
                                $somethingtoChange = true;
                                if (isset($location_obj['town']))
                                {
                                    $venue->set('town', $location_obj['town']);
                                }
                                else
                                {
                                    $venue->set('town', 'locality');
                                }
                            }
                            if ($venue->is_null('county'))
                            {
                                $somethingtoChange = true;
                                if (isset($location_obj['county']))
                                {
                                    $venue->set('county', $location_obj['county']);
                                }
                                else
                                {
                                    $venue->set('county', 'locality');
                                }
                            }
                            if ($venue->is_null('post_code') && isset($location_obj['post_code']))
                            {
                                $somethingtoChange = true;
                                $venue->set('post_code', $location_obj['post_code']);
                            }
                        }
                        if ($somethingtoChange)
                        {
                            $this->$modelVenues->insert_update($venue);
                        }
                        else
                        {
                            error_log('Nothing to change');
                        }
                    }
                    else
                    {
                        if (isset($response['status']))
                        {
                            error_log('Bad status from geocode api - ' . $response['status']);
                        }
                        else
                        {
                            error_log('No results and no status from geocode api - ' . $venue->get_id());
                        }
                    }
                    usleep(500000);
                }
            }
            else
            {
                error_log('No results from venue query');
            }
        }
        else
        {
            redirect('/' . $this->data['country_lang_url']);
        }
    }

    public function venue_update($hash = null)
    {
        if ($hash == 'ae2c8899a42cd69c52ab7f57eaaeeabf')
        {
            $modelVenues = Model__venues::class;
            $this->load->model($modelVenues);
            $venues = $this->$modelVenues->get_venue_object_collection_without_location_data(false);
            if ($venues->exists_in_db())
            {
                $this->load->library('GoogleGeocodeAPI');
                foreach ($venues->object() as $venue)
                {
                    $setLatLng = false;
                    $somethingtoChange = false;
                    if (!$venue->is_null('address'))
                    {
                        $response = $this->googlegeocodeapi->address_geocode($venue->get('address'));
                        $setLatLng = true;
                    }
                    elseif (!$venue->is_null('lat') && !$venue->is_null('long'))
                    {
                        $response = $this->googlegeocodeapi->latlng_geocode($venue->get('lat'), $venue->get('long'));
                    }
                    if (isset($response['results']) && count($response['results']) > 0)
                    {
                        $location = $response['results'][0];
                        if (isset($location['address_components']))
                        {
                            $location_obj = [];
                            $address_components = $location['address_components'];
                            foreach ($address_components as $address_component)
                            {
                                $types = $address_component['types'];
                                if (in_array('locality', $types))
                                {
                                    $location_obj['city'] = $address_component['long_name'];
                                }
                                elseif (in_array('country', $types))
                                {
                                    $location_obj['country'] = $address_component['long_name'];
                                    $location_obj['country_code'] = $address_component['short_name'];
                                }
                            }
                            if ($venue->is_null('city') && isset($location_obj['city']))
                            {
                                $somethingtoChange = true;
                                $venue->set('city', $location_obj['city']);
                            }
                            if ($venue->is_null('country') && isset($location_obj['country']))
                            {
                                $somethingtoChange = true;
                                $venue->set('country', $location_obj['country']);
                            }
                            if ($venue->is_null('country_code') && isset($location_obj['country_code']))
                            {
                                $somethingtoChange = true;
                                $venue->set('country_code', $location_obj['country_code']);
                            }
                        }
                        if ($setLatLng)
                        {
                            if ($venue->is_null('lat') && isset($response['results'][0]['geometry']['location']['lat']))
                            {
                                $somethingtoChange = true;
                                $venue->set('lat', $response['results'][0]['geometry']['location']['lat']);
                            }
                            if ($venue->is_null('long') && isset($response['results'][0]['geometry']['location']['lng']))
                            {
                                $somethingtoChange = true;
                                $venue->set('long', $response['results'][0]['geometry']['location']['lng']);
                            }
                        }
                    }
                    if ($somethingtoChange)
                    {
                        $this->$modelVenues->insert_update($venue);
                    }
                }
            }
        }
        else
        {
            redirect('/' . $this->data['country_lang_url']);
        }
    }
}