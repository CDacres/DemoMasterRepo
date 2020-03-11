<?php

namespace App\Helpers;

use Monolog\Logger;
use Illuminate\Support\Facades\Mail;
use Swift_Message;

use App\Helpers\ChannelStreamHandler;

class ChannelWriter
{
    /**
     * The Log channels.
     *
     * @var array
     */
    protected $channels = [];
    protected $_default_channel;
    /**
     * The Log levels.
     *
     * @var array
     */
    protected $levels = [
        'debug'     => Logger::DEBUG,
        'info'      => Logger::INFO,
        'notice'    => Logger::NOTICE,
        'warning'   => Logger::WARNING,
        'error'     => Logger::ERROR,
        'critical'  => Logger::CRITICAL,
        'alert'     => Logger::ALERT,
        'emergency' => Logger::EMERGENCY,
    ];

    public function __construct()
    {
        $this->channels['default'] = [
            'path' => env('LOG_STREAM'),
            'level' => Logger::INFO,
            'sends_email' => false,
            //'pings_slack' => true
        ];
        $this->_default_channel = 'default';
        $this->_check_channel_exists($this->_default_channel);
    }

    private function _check_channel_exists($channel)
    {
        if (!in_array($channel, array_keys($this->channels)))
        {
            throw new InvalidArgumentException('Invalid channel used.');
        }
    }
    /**
     * Write to log based on the given channel and log level set
     *
     * @param type $channel
     * @param type $message
     * @param array $context
     * @throws InvalidArgumentException
     */
    public function writeLog($message, $level, $channel, array $context = [])
    {
        //check channel exist
        $this->_check_channel_exists($channel);
        //lazy load logger
        if (!isset($this->channels[$channel]['_instance']))
        {
            //create instance
            $this->channels[$channel]['_instance'] = new Logger($channel);
            //add custom handler
            $this->channels[$channel]['_instance']->pushHandler(
                new ChannelStreamHandler(
                    $channel,
                    $this->channels[$channel]['path'],
                    $this->channels[$channel]['level']
                )
            );
            $this->_add_handlers($this->channels[$channel]);
        }
        //write out record
        $this->channels[$channel]['_instance']->{$level}($message, $context);
    }

    private function _add_handlers($channel)
    {
        if ($channel['sends_email'])
        {
            $channel['_instance']->pushHandler(
                new \Monolog\Handler\SwiftMailerHandler(
                    Mail::getSwiftMailer(),
                    Swift_Message::newInstance('Data server error - investigate')->setFrom('info@zipcube.com')->setTo(env('TECH_EMAIL')),
                    Logger::ERROR, // set minimal log lvl for mail
                    true // bubble to next handler?
                )
            );
        }
        // slack etc if it becomes necessary
    }

    public function write($message, $channel, array $context = [])
    {
        //get method name for the associated level
        $level = array_flip( $this->levels )[$this->channels[$channel]['level']];
        //write to log
        $this->writeLog($message, $level, $channel, $context);
    }

    //alert('event','Message');
    function __call($func, $params)
    {
        if (in_array($func, array_keys($this->levels)))
        {
            $channel = ((isset($params[1]) && !is_null($params[1]))?$params[1]:$this->_default_channel);
            $context = ((isset($params[2]))?$params[2]:[]);
            return $this->writeLog($params[0], $func, $channel, $context);
        }
    }
}