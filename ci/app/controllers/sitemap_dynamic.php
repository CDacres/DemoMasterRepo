<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class sitemap_dynamic extends CI_Controller
{
    function __construct()
    {
        parent::__construct();
    }

    private function url_xml_element($xml, $path, $priority, $country = '', $other_lang = [])
    {
        $url = $xml->addChild('url');
        $url->addChild('loc', base_url() . (($country != '')?$country:'uk') . '/' . $path);
        if ($other_lang == false)
        {
            foreach (config_item('supported_cctlds') as $key => $values)
            {
                $lng = $url->addChild('xhtml:link', '', 'http://www.w3.org/1999/xhtml');
                $lng->addAttribute('rel', 'alternate');
                $lng->addAttribute('hreflang', $values['hreflang']);
                $lng->addAttribute('href', base_url() . $key . '/' . $path);
            }
            foreach (config_item('languages') as $langKey => $langValues)
            {
                if ($langValues['alt_url'])
                {
                    $lng = $url->addChild('xhtml:link', '', 'http://www.w3.org/1999/xhtml');
                    $lng->addAttribute('rel', 'alternate');
                    $lng->addAttribute('hreflang', $langKey);
                    $lng->addAttribute('href', base_url() . $langValues['alt_country'] . '/' . $path);
                }
            }
        }
        else
        {
            foreach (config_item('supported_cctlds') as $countryKey => $values)
            {
                foreach ($other_lang as $lang => $other_url)
                {
                    if ($values['lang'] == $lang)
                    {
                        $lng = $url->addChild('xhtml:link', '', 'http://www.w3.org/1999/xhtml');
                        $lng->addAttribute('rel', 'alternate');
                        $lng->addAttribute('hreflang', $values['hreflang']);
                        $lng->addAttribute('href', base_url() . $countryKey . '/' . $other_url);
                    }
                }
            }
            foreach (config_item('languages') as $langKey => $langValues)
            {
                if ($langValues['alt_url'])
                {
                    foreach ($other_lang as $lang => $other_url)
                    {
                        if ($langKey == $lang)
                        {
                            $lng = $url->addChild('xhtml:link', '', 'http://www.w3.org/1999/xhtml');
                            $lng->addAttribute('rel', 'alternate');
                            $lng->addAttribute('hreflang', $langKey);
                            $lng->addAttribute('href', base_url() . $langValues['alt_country'] . '/' . $other_url);
                        }
                    }
                }
            }
        }
        $url->addChild('lastmod', date("Y-m-d", strtotime('monday this week')));
        $url->addChild('priority', $priority);
        $url->addChild('changefreq', 'weekly');
        return $url;
    }

    private function landing_page_sitemap()
    {
        $xml = simplexml_load_file('sitemap_template.xml');
        $modelLandingPageLang = Model__landing_page_language::class;
        $this->load->model($modelLandingPageLang);
        $landing_pages = $this->$modelLandingPageLang->get_sitemap_landing_page_collection();
        $landPageArr = [];
        foreach ($landing_pages->object() as $landing_page)
        {
            $landPageArr[$landing_page->get('landing_page_id')][$landing_page->get('lang_code')] = landing_page_url($landing_page->get('landing_page_tag_slug'), $landing_page->get('landing_page_location_url'));
        }
        foreach ($landing_pages->object() as $landing_page)
        {
            foreach (config_item('supported_cctlds') as $country => $values)
            {
                if ($values['locale'] == $landing_page->get('landing_page_location_country') && $values['lang'] == $landing_page->get('lang_code'))
                {
                    $this->url_xml_element($xml, landing_page_url($landing_page->get('landing_page_tag_slug'), $landing_page->get('landing_page_location_url')), 0.8, $country, ((isset($landPageArr[$landing_page->get('landing_page_id')]))?$landPageArr[$landing_page->get('landing_page_id')]:''));
                }
            }
        }
        $xml->asXml('sitemap_landing_page.xml');
    }

    private function browse_page_sitemap()
    {
        $xml = simplexml_load_file('sitemap_template.xml');
        $modelLandingPageLang = Model__landing_page_language::class;
        $this->load->model($modelLandingPageLang);
        $landing_pages = $this->$modelLandingPageLang->get_sitemap_landing_page_collection('browse');
        $landPageArr = [];
        foreach ($landing_pages->object() as $landing_page)
        {
            $landPageArr[$landing_page->get('landing_page_id')][$landing_page->get('lang_code')] = landing_page_url($landing_page->get('landing_page_tag_slug'));
        }
        foreach ($landing_pages->object() as $landing_page)
        {
            foreach (config_item('supported_cctlds') as $country => $values)
            {
                if ($values['locale'] == $landing_page->get('landing_page_location_country') && $values['lang'] == $landing_page->get('lang_code'))
                {
                    $this->url_xml_element($xml, landing_page_url($landing_page->get('landing_page_tag_slug')), 0.6, $country, ((isset($landPageArr[$landing_page->get('landing_page_id')]))?$landPageArr[$landing_page->get('landing_page_id')]:''));
                }
            }
        }
        $xml->asXml('sitemap_browse_page.xml');
    }

    private function static_page_sitemap()
    {
        $paths = ['how-it-works',
            'users/signin',
            'users/signup',
            'how-to-share',
            'about',
            'contact',
            'legal',
            'faq'
        ];
        $xml = simplexml_load_file('sitemap_template.xml');
        foreach ($paths as $path)
        {
            $this->url_xml_element($xml, $path, 0.3);
        }
        $xml->asXml('sitemap_static_page.xml');
    }

    private function home_page_sitemap()
    {
        $xml = simplexml_load_file('sitemap_template.xml');
        foreach (array_keys(config_item('supported_cctlds')) as $country)
        {
            $this->url_xml_element($xml, '', 0.6, $country);
        }
        $xml->asXml('sitemap_home_page.xml');
    }

    private function venue_page_sitemap()
    {
        $xml = simplexml_load_file('sitemap_template.xml');
        $modelVenues = Model__venues::class;
        $this->load->model($modelVenues);
        $venues = $this->$modelVenues->get_all_approved_venues();
        foreach ($venues->object() as $venue)
        {
            $this->url_xml_element($xml, 'venues/' . seo_url($venue->get('name')) . '/' . $venue->get_id(), 0.5, ((isset(config_item('supported_locales')[strtolower($venue->get('country_code'))]))?config_item('supported_locales')[strtolower($venue->get('country_code'))]:'uk'));
        }
        $xml->asXml('sitemap_venues_page.xml');
    }

    public function index()
    {
        header('Content-type: application/xml');
        header('X-Robots-Tag: noindex');

        $sitemapindex = new SimpleXMLElement("<sitemapindex xmlns='http://www.sitemaps.org/schemas/sitemap/0.9'></sitemapindex>");

        $this->static_page_sitemap();
        $static_page = $sitemapindex->addChild('sitemap');
        $static_page->addChild('loc', base_url() . 'sitemap_static_page.xml');

        $this->landing_page_sitemap();
        $landing_page = $sitemapindex->addChild('sitemap');
        $landing_page->addChild('loc', base_url() . 'sitemap_landing_page.xml');

        $this->venue_page_sitemap();
        $venue_page = $sitemapindex->addChild('sitemap');
        $venue_page->addChild('loc', base_url() . 'sitemap_venues_page.xml');

        $this->browse_page_sitemap();
        $browse_page = $sitemapindex->addChild('sitemap');
        $browse_page->addChild('loc', base_url() . 'sitemap_browse_page.xml');

        $this->home_page_sitemap();
        $home_page = $sitemapindex->addChild('sitemap');
        $home_page->addChild('loc', base_url() . 'sitemap_home_page.xml');

        echo $sitemapindex->asXML();
    }
}