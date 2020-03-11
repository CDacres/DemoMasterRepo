<?php

namespace App\Helpers;

use stdClass;

class LandingHelper
{
    public function check_domain($domain)
    {
        return preg_match("/^([a-zA-Z]{2})$/", $domain);
    }

    public function check_vertical($vertical)
    {
        return preg_match("/^([\p{L}\p{N}\-]+)$/", utf8_decode($vertical));
    }

    public function check_location($location)
    {
        return preg_match("/^([\p{L}\p{N}%\'\.\~\-]+)$/", utf8_decode($location));
    }

    public function create_url($url, $withDomain = true, $fullLink = false)
    {
        $retUrl = '';
        if ($fullLink)
        {
            $retUrl .= env('SITE_URL') . '/';
        }
        if ($withDomain)
        {
            $retUrl .= (new DomainHelper())->find_domain_code_by_locale($url->locale_id);
        }
        $retUrl .= $url->url;
        return $retUrl;
    }

    public function find_preferred_url($blp_urls)
    {
        return $blp_urls->first(function($item) {
            return $item->preferred == 1;
        });
    }

    public function find_canonical_url($blp_urls, $tag_meta, $url)
    {
        $preferredUrl = $this->find_preferred_url($blp_urls);
        if (!is_null($preferredUrl))
        {
            $canonical_url = $this->create_url($preferredUrl);
        }
        elseif ($tag_meta->preferred)
        {
            $canonical_url = $tag_meta->slug;
        }
        else
        {
            $canonical_url = $url;
        }
        return env('SITE_URL') . '/' . $canonical_url;
    }

    public function create_home_breadcrumb($tagMetaLabel, $langCode)
    {
        $home = $this->add_fake_breadcrumb([]);
        $home[0]->id = 1;
        $home[0]->text = trans('blp.home_breadcrumb_text', [], $langCode);
        $home[0]->title = trans('blp.home_breadcrumb_title', ['link_label' => $tagMetaLabel], $langCode);
        $home[0]->url = '/';
        return $home;
    }

    public function add_fake_breadcrumb($blpArr)
    {
        if (count($blpArr) == 0)
        {
            $fakeBreadcrumb = new stdClass;
            $blpArr[] = $fakeBreadcrumb;
        }
        return $blpArr;
    }

    public function get_breadcrumbs($breadcrumbs)
    {
        $retBreadArr = [];
        foreach ($breadcrumbs as $breadcrumb)
        {
            $crumb = [
                'id' => (string) $breadcrumb->id,
                'text' => (string) $breadcrumb->text
            ];
            if (isset($breadcrumb->full_url))
            {
                $crumb['full_link'] = (string) $breadcrumb->full_url;
            }
            if (isset($breadcrumb->url))
            {
                $crumb['href'] = (string) $breadcrumb->url;
                $crumb['title'] = (string) $breadcrumb->title;
            }
            $retBreadArr[] = $crumb;
        }
        return $retBreadArr;
    }

    public function landing_page_url($tag_slug, $location_url = '', $attr_url = '')
    {
        return (($attr_url != '')?$attr_url . '--':'') . $tag_slug . (($location_url != '')?'/' . $location_url:'');
    }
}