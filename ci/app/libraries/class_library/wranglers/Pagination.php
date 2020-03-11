<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Wrangler__Pagination extends Base__Wrangler
{
    /*
     * data:
     *
     * current_page     int
     * results_per_page int
     * total_results    int
     */

    function _yield_wrangled_data()
    {
        yield '_html' => $this->as_html();
        yield '_range' => $this->get_current_range_string();
    }

    function as_html()
    {
        $retString = '';
        foreach ($this->_get_page_array() as $pageData)
        {
            $retString .= '<span';
            if ($pageData['active'])
            {
                $retString .= ' zc_page_number="' . $pageData['page'] . '" class="zc_pagination link"';
            }
            elseif ($pageData['page'] == '...')
            {
                $retString .= ' class="pagination_gap"';
            }
            else
            {
                $retString .= ' class="selected_pagination"';
            }
            $retString .= '>' . $pageData['page'] . '</span>';
        }
        return $retString;
    }

    private function _get_page_array()
    {
        $currentPage = $this->get('current_page');
        $resultsPerPage = $this->get('results_per_page');
        $rowCount = $this->get('total_results');
        $maxPage = ceil($rowCount / $resultsPerPage);
        $pagesArray = [];
        $break = 0;
        for ($pageNumber = 1; $pageNumber <= $maxPage; ++$pageNumber)
        {
            if (($pageNumber < 2) || abs($pageNumber - $currentPage) < 2 || abs($currentPage - $pageNumber) < 2 || ($maxPage - $pageNumber) < 1)
            {
                if ($break == 1)
                {
                    $pagesArray[] = [
                        'page' => ($pageNumber - 1),
                        'active' => ((($pageNumber - 1) == $currentPage)?0:1)
                    ];
                }
                $pagesArray[] = [
                    'page' => $pageNumber,
                    'active' => (($pageNumber == $currentPage)?0:1)
                ];
                $break = 0;
            }
            else
            {
                if ($break == 1)
                {
                    $pagesArray[] = [
                        'page' => '...',
                        'active' => 0
                    ];
                }
                ++$break;
            }
        }
        return ((count($pagesArray) > 1)?$pagesArray:[]);
    }

    function get_current_range_string()
    {
        $resultsPerPage = $this->get('results_per_page');
        $offset = $this->_get_offset($this->get('current_page'),$resultsPerPage);
        return ($offset + 1) . " - " . min(($offset + $resultsPerPage), $this->get('total_results'));
    }

    private function _get_offset($currentPage, $resultsPerPage)
    {
        return (($currentPage - 1) * $resultsPerPage);
    }
}