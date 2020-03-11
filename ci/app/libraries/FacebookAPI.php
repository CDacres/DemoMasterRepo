<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class FacebookAPI
{
    protected $app_id = "";
    protected $app_secret = "";
    protected $app_graph_version = "";

    public function __construct()
    {
        $this->app_id = getenv('FACEBOOK_APP_ID');
        $this->app_secret = getenv('FACEBOOK_APP_SECRET');
        $this->app_graph_version = getenv('FACEBOOK_GRAPH_VERSION');
        $this->fb = new Facebook\Facebook([
            'app_id' => $this->app_id,
            'app_secret' => $this->app_secret,
            'default_graph_version' => $this->app_graph_version
        ]);
    }

    /**
     * @return url | string
     */
    public function get_login_link_url()
    {
        $helper = $this->fb->getRedirectLoginHelper();
        $permissions = ['email', 'public_profile', 'user_friends'];
        return $helper->getLoginUrl(base_url() . '/auth/facebook/login/callback', $permissions);
    }

    /**
     * @return url | string
     */
    public function get_signup_link_url()
    {
        $helper = $this->fb->getRedirectLoginHelper();
        $permissions = ['email', 'public_profile', 'user_friends'];
        return $helper->getLoginUrl(base_url() . '/auth/facebook/signup/callback', $permissions);
    }

    /**
     * @return \Facebook\GraphNodes\GraphUser|string
     */
    public function get_user_profile($token_string = null)
    {
        $helper = $this->fb->getRedirectLoginHelper();
        if ($token_string === null)
        {
            try
            {
                $accessToken = $helper->getAccessToken();
            }
            catch(Facebook\Exceptions\FacebookResponseException $e)
            {
                return $e->getMessage();
            }
            catch(Facebook\Exceptions\FacebookSDKException $e)
            {
                return $e->getMessage();
            }
        }
        else
        {
            $expires = time() + 60 * 60 * 2;
            $accessToken = new Facebook\Authentication\AccessToken($token_string, $expires);
        }
        if (!isset($accessToken))
        {
            if ($helper->getError())
            {
                return $helper->getErrorReason();
            }
            else
            {
                return 'Bad request';
            }
        }
        $oAuth2Client = $this->fb->getOAuth2Client();
        $tokenMetadata = $oAuth2Client->debugToken($accessToken);
        $tokenMetadata->validateAppId($this->app_id);
        $tokenMetadata->validateExpiration();
        if (!$accessToken->isLongLived())
        {
            try
            {
                $accessToken = $oAuth2Client->getLongLivedAccessToken($accessToken);
            }
            catch (Facebook\Exceptions\FacebookSDKException $e)
            {
                return $e->getMessage();
            }
        }
        $_SESSION['fb_access_token'] = (string) $accessToken;
        try
        {
            $response = $this->fb->get('/me?fields=id,first_name,last_name,email', $accessToken);
        }
        catch(\Facebook\Exceptions\FacebookResponseException $e)
        {
            return $e->getMessage();
        }
        catch(\Facebook\Exceptions\FacebookSDKException $e)
        {
            return $e->getMessage();
        }
        return $response->getGraphUser();
    }
}
