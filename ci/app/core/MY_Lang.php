<?php

class MY_Lang extends CI_Lang
{
    function __construct()
    {
        parent::__construct();
    }

    private function _line($args, $from_file = true)
    {
        //count the number of arguments
        $c = count($args);

        //if one or more arguments, perform the necessary processing
        if ($c)
        {
            //first argument should be the actual language line key
            //so remove it from the array (pop from front)
            $line = array_shift($args);

            if ($from_file)
            {
                $line = ($line == '' OR ! isset($this->language[$line])) ? FALSE : $this->language[$line];
            }

            //if the line exists and more function arguments remain
            //perform wildcard replacements
            if ($line && $args)
            {
                $i = 1;
                foreach ($args as $arg)
                {
                    $line = preg_replace('/\{\{' . $i . '\}\}/', $arg, $line);
                    ++$i;
                }
            }
        }
        else
        {
            //if no arguments given, no language line available
            $line = false;
        }
        return $line;
    }

    public function bespoke_line()
    {
        return $this->_line(func_get_args(), false);
    }

    /**
     * Fetch a single line of text from the language array. Takes variable number
     * of arguments and supports wildcards in the form of '{{1}}', '{{2}}', etc.
     * Overloaded function.
     *
     * @access public
     * @return mixed false if not found or the language string
     */
    public function line($line = '')
    {
        return $this->_line(func_get_args());
    }
}