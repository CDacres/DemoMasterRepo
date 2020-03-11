<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

function conditional_string($compareLeft, $compareRight, $conditionalString)
{
    $returnString = '';
    if ($compareLeft == $compareRight)
    {
        $returnString = $conditionalString;
    }
    return $returnString;
}

function conditional_in_array_string($needle, $haystack, $conditionalString)
{
    $returnString = '';
    if (in_array($needle, $haystack))
    {
        $returnString = $conditionalString;
    }
    return $returnString;
}

function js_variables_to_script($jsVarArray = [])
{
    $variableString = '';
    foreach ($jsVarArray as $key => $value)
    {
        $variableString .= 'var ' . $key . '=' . json_encode($value) . ';';
    }
    return $variableString;
}

function auto_version($file)
{
    $ext = pathinfo($file, PATHINFO_EXTENSION);
    if ($ext == 'css' || $ext == 'js')
    {
        if ($ext == 'css' && file_exists(CSSPATH . $file))
        {
            return cdn_css() . $file . '?' . filemtime(CSSPATH . $file);
        }
        elseif ($ext == 'css' && file_exists(NEWCSSPATH . $file))
        {
            return cdn_newcss() . $file . '?' . filemtime(NEWCSSPATH . $file);
        }
        elseif ($ext == 'js' && file_exists(JSPATH . $file))
        {
            return cdn_js() . $file . '?' . filemtime(JSPATH . $file);
        }
        else
        {
            return false;
        }
    }
    else
    {
        return $file;
    }
}

function manifest_item($script)
{
    $manifestJSON = get_content(DISTPATH . 'assets/manifest.json');
    if ($manifestJSON)
    {
        $assetManifest = json_decode($manifestJSON);
        if (isset($assetManifest))
        {
            $hash = md5($manifestJSON);
            return cdn_dist() . 'assets/' . $assetManifest->$script . '?' . $hash;
        }
    }
    return false;
}

function get_content($URL)
{
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_URL, $URL);
    $data = curl_exec($ch);
    curl_close($ch);
    return $data;
}

function node_server_home_bundle()
{
    $manifestJSON = get_content(NODESERVERPATH . 'manifest.json');
    if ($manifestJSON)
    {
        $assetManifest = json_decode($manifestJSON);
        if (isset($assetManifest))
        {
            return cdn_dist() . 'pages/' . $assetManifest->{'home.js'};
        }
    }
    return false;
}

function node_server_main_bundle()
{
    $manifestJSON = get_content(NODESERVERPATH . 'manifest.json');
    if ($manifestJSON)
    {
        $assetManifest = json_decode($manifestJSON);
        if (isset($assetManifest))
        {
            return cdn_dist() . 'pages/' . $assetManifest->{'main.js'};
        }
    }
    return false;
}

function node_server_search_bundle()
{
    $manifestJSON = get_content(NODESERVERPATH . 'manifest.json');
    if ($manifestJSON)
    {
        $assetManifest = json_decode($manifestJSON);
        if (isset($assetManifest))
        {
            return cdn_dist() . 'pages/' . $assetManifest->{'search.js'};
        }
    }
    return false;
}

function node_server_dashboard_bundle()
{
    $manifestJSON = get_content(NODESERVERPATH . 'manifest.json');
    if ($manifestJSON)
    {
        $assetManifest = json_decode($manifestJSON);
        if (isset($assetManifest))
        {
            return cdn_dist() . 'pages/' . $assetManifest->{'dashboard.js'};
        }
    }
    return false;
}

function inline_chunk_manifest()
{
    $manifestJSON = get_content(DISTPATH . 'assets/chunk-manifest.json');
    if ($manifestJSON)
    {
        return $manifestJSON;
    }
    return false;
}

function node_module($filepath)
{
    return cdn_node() . $filepath;
}

if (!function_exists('format_price'))
{
    function format_price($price)
    {
        $value = (ceil(100000 * $price) / 100000);
        if ($value == (int)$value)
        {
            $retVal = $value;
        }
        else
        {
            $retVal = number_format($value, 2);
        }
        return $retVal;
    }
}