<?php if (!defined('BASEPATH')) exit('No direct script access allowed');
/**
 * twitter
 * 
 * Config for Twitter
 *
 * @author Simon Emms <simon@simonemms.com>
 */


$active_group = "default";
$active_record = TRUE;
$CI =& get_instance();

$db['default']['hostname'] = $CI->config->item('hostname');
$host = $db['default']['hostname'];
$db['default']['username'] = $CI->config->item('db_username');
$user = $db['default']['username'];
$db['default']['password'] = $CI->config->item('db_password');
$pass = $db['default']['password'];
$db['default']['database'] = $CI->config->item('db');
$dbb = $db['default']['database'];

$con = @mysql_connect("$host","$user","$pass");
if (!$con)
  {
  die('Could not connect: ' . mysql_error());
  }

mysql_select_db("$dbb", $con);
/* Access tokens */

$query = mysql_query("SELECT code,string_value FROM settings WHERE code ='SITE_TWITTER_API_ID'");

while($row = mysql_fetch_array($query))
{
   $consumer_key = $row['string_value'];
/*   print($consumer_key);
  // exit();*/
}

$query1 = mysql_query("SELECT code,string_value FROM settings WHERE code ='SITE_TWITTER_API_SECRET'");

while($row1 = mysql_fetch_array($query1))
{
   $consumer_secret = $row1['string_value'];
/*   print($consumer_secret);
   exit();*/
}

$config['twitter'] = array(
    '_tokens' => array(
        'consumer_key' => "$consumer_key",
        'consumer_secret' => "$consumer_secret",
        //'access_key' => '',
        //'access_secret' => '',
    ),
    '_force_login' => false, /* Do we force the user to login */
    '_token_session' => 'twitter_oauth_tokens', /* Session name */
    '_open_in_new_window' => true, /* Do links in Tweets get opened in a new window (add target="_blank" if true) */
    '_new_window_target' => '_blank',
    '_search_url' => 'http://twitter.com/search?q=%search%', /* Link for searches - '%search% is where the search key lives */
    '_user_url' => 'http://twitter.com/%user%', /* Link for profiles - %user% is where the username lives */
    
    /* Cache method (remember to make /applications/cache writable) or false for no caching */
    '_cache_method' => array(
        'adapter' => 'apc',
        'backup' => 'file',
    ),
    'cache_timeout' => 60, /* Timeout in seconds */
    
    /* Most of these things shouldn't change */
    '_access_token_url' => 'http://api.twitter.com/oauth/access_token',
    '_api_url' => 'http://api.twitter.com',
    '_authorization_url' => 'http://api.twitter.com/oauth/authorize',
    '_request_token_url' => 'http://api.twitter.com/oauth/request_token',
    '_signature_method' => 'HMAC-SHA1',
    '_version' => '1.0',
    '_method' => 'json',
);

?>