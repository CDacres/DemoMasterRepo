<?php

php_sapi_name() !== 'cli' && header('Location: index.php');

function getPathSegments($string)
{
    return explode("/", $string);
}

function getSegment($string, $n)
{
    $segs = getPathSegments($string);
    return count($segs) > 0 && count($segs) >= ($n-1) ? $segs[$n] : '';
}

$path = "./app/language";
$objects = new RecursiveIteratorIterator(new RecursiveDirectoryIterator($path), RecursiveIteratorIterator::SELF_FIRST);

foreach($objects as $name => $object)
{
    $lang = [];
    if (preg_match('/^.+\.php$/i', $name))
    {
        include(substr($name, 2));
        $locale = getSegment($name, 3);
        $file_name = explode(".", getSegment($name, 4))[0];
        if (!file_exists("./lang/" . $locale))
        {
            mkdir("./lang/" . $locale);
        }
        file_put_contents("./lang/" . $locale . "/" . $file_name . ".json", json_encode($lang));
    }
}
