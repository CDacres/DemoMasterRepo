<?php

class MY_Loader extends CI_Loader
{
    /**
     * Model Loader
     *
     * This function lets users load and instantiate models.
     *
     * @access	public
     * @param	string	the name of the class
     * @param	string	name for the model
     * @param	bool	database connection
     * @return	void
     */

    function model($model, $name = '', $db_conn = FALSE)
    {
        if (is_array($model))
        {
            foreach ($model as $babe)
            {
                $this->model($babe);
            }
            return;
        }
        if ($model == '')
        {
            return;
        }
        $path = '';
        // Is the model in a sub-folder? If so, parse out the filename and path.
        if (($last_slash = strrpos($model, '/')) !== FALSE)
        {
            // The path is in front of the last slash
            $path = substr($model, 0, $last_slash + 1);
            // And the model name behind it
            $model = substr($model, $last_slash + 1);
        }
        if ($name == '')
        {
            $name = $model;
        }
        if (in_array($name, $this->_ci_models, TRUE))
        {
            return;
        }
            $CI = &get_instance();
            if (isset($CI->$name))
            {
                show_error('The model name you are loading is the name of a resource that is already being used: ' . $name);
            }
            $model = strtolower($model);
            foreach ($this->_ci_model_paths as $mod_path)
            {
                if (!file_exists($mod_path . 'models/' . $path . $model . EXT))
                {
                    continue;
                }
                if ($db_conn !== FALSE AND ! class_exists('CI_DB'))
                {
                    if ($db_conn === TRUE)
                    {
                        $db_conn = '';
                    }
                    $CI->load->database($db_conn, FALSE, TRUE);
                }
                if (!class_exists('CI_Model'))
                {
                    load_class('Model', 'core');
                }
                require_once($mod_path . 'models/' . $path . $model . EXT);
                $model = ucfirst($model);
                $CI->$name = new $model();
                if (method_exists($CI->$name, 'set_environment') && method_exists($CI, 'get_user'))
                {
                    $CI->$name->set_environment($CI->get_user()); //Set the model's currency and user.
                }
                $this->_ci_models[] = $name;
                return;
            }
            // couldn't find the model
            show_error('Unable to locate the model you have specified: ' . $model);
    }

    /**
    * Database Loader
    *
    * @access    public
    * @param    string    the DB credentials
    * @param    bool    whether to return the DB object
    * @param    bool    whether to enable active record (this allows us to override the config setting)
    * @return    object
    */

    function database($params = '', $return = FALSE, $active_record = NULL)
    {
        // Do we even need to load the database class?
        if (class_exists('CI_DB') AND $return == FALSE AND $active_record == NULL)
        {
            return FALSE;
        }
        require_once(BASEPATH . 'database/DB' . EXT);
        // Load the DB class
        $db =& DB($params, $active_record);
        $my_driver = config_item('subclass_prefix') . 'DB_' . $db->dbdriver . '_driver';
        $my_driver_file = APPPATH . 'core/' . $my_driver.EXT;
        if (file_exists($my_driver_file))
        {
            require_once($my_driver_file);
            $db = new $my_driver(get_object_vars($db));
        }
        if ($return === TRUE)
        {
            return $db;
        }
        // Grab the super object
        $CI = &get_instance();
        // Initialize the db variable.  Needed to prevent
        // reference errors with some configurations
        $CI->db = '';
        $CI->db = $db;
        // Assign the DB object to any existing models
        //$this->_ci_assign_to_models();
    }
}