<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Wrangler__Image extends Base__Wrangler
{
    private $_sizes;
    private $_profile_sizes;
    private $_path;
    private $_path_url;

    /*
     * data:
     *
     * name         string
     * subject_id   int
     * user_id      int
     */

    function _yield_wrangled_data()
    {
        foreach (array_keys($this->_sizes) as $size)
        {
            yield '_' . $size => $this->get_url($size);
        }
    }

    public function get_url($size)
    {
        if ($this->data_exists('name') && $this->data_not_empty('name') && $this->data_exists('subject_id') && $this->data_not_empty('subject_id'))
        {
            $retSrc = getenv('IMAGES_URL') . '/' . $this->get('subject_id') . '/' . $this->_sizes[$size][0] . '_' . $this->_sizes[$size][1] . '_' . $this->get('name');
        }
        else
        {
            $retSrc = base_url() . 'images/no_image.jpg';
        }
        return $retSrc;
    }

    public function get_user_url($size)
    {
        if (!isset($this->_profile_sizes[$size]))
        {
            $retSrc = $this->_get_missing_avatar();
        }
        elseif ($this->is_null('user_id') || !is_dir($this->_path . 'users/' . $this->get('user_id')))
        {
            $retSrc = $this->_get_missing_avatar($size);
        }
        else
        {
            $files = array_diff(scandir($this->_path . 'users/' . $this->get('user_id')), ['.','..']);
            if (count($files) == 0)
            {
                $retSrc = $this->_get_missing_avatar($size);
            }
            else
            {
                foreach ($files as $file)
                {
                    $ext = explode('.', $file);
                }
                $retSrc = $this->_path_url . 'users/' . $this->get('user_id') . '/userpic_' . $size . '.' . $ext[1];
            }
        }
        return $retSrc;
    }

    private function _get_missing_avatar($size = null)
    {
        $retAva = base_url() . 'images/no_avatar.jpg';
        if ($size != null)
        {
            switch ($size)
            {
                case 'thumb':

                    $retAva = base_url() . 'images/no_avatar_thumb.jpg';
                break;

                case 'profile':

                    $retAva = base_url() . 'images/no_avatar-xlarge.jpg';
                break;

                case 'micro':

                    $retAva = base_url() . 'images/no_avatar.jpg';
                break;
            }
        }
        return $retAva;
    }

    public function get_path()
    {
        return $this->_path;
    }

    public function get_sizes()
    {
        return $this->_sizes;
    }

    public function get_profile_sizes()
    {
        return $this->_profile_sizes;
    }

    protected function _post_construction()
    {
        $this->_sizes = [          //as width, height in pixels
            'small' => [190, 120],
            'medium' => [300, 200],
            'large' => [639, 428],
            'huge' => [870, 450]
        ];
        $this->_profile_sizes = [
            'thumb' => [107, 78],
            'profile' => [209, 209],
            'micro' => [36, 36]
        ];
        $this->_path = realpath(APPPATH . '../images') . '/';
        $this->_path_url = base_url() . 'images/';
    }
}