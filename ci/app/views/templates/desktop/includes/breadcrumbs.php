<div class="container breadcrumbs">
    <div id="breadcrumbs_wrapper">
        <div class="col-sm-12 left-p-0">
            <?php
                if (!empty($breadcrumbs))
                {
                    echo '<ol class="breadcrumb" itemscope="" itemtype="http://schema.org/BreadcrumbList">';
                    if (count($breadcrumbs['crumbs']) > 0)
                    {
                        $first = true;
                        foreach ($breadcrumbs['crumbs'] as $breadcrumb)
                        {
                            echo '<li itemprop="itemListElement" itemscope="" itemtype="http://schema.org/ListItem"';
                            if ($first)
                            {
                                $first = false;
                            }
                            else
                            {
                                echo ' class="breadcrumb-subsequent"';
                            }
                            if (isset($breadcrumb['url']))
                            {
                                echo ' id="' . $breadcrumb['url'] . '"><a itemprop="item" href="' . $breadcrumb['url'] . '" title="' . $breadcrumb['title'] . '">' . $breadcrumb['desc'] . '</a>';
                            }
                            else
                            {
                                echo '>' . $breadcrumb['desc'];
                            }
                            echo '</li>';
                        }
                    }
                    echo '<li itemprop="itemListElement" itemscope="" itemtype="http://schema.org/ListItem" class="breadcrumb-subsequent active">' . $breadcrumbs['bread']['desc'] . '</li></ol>';
                }
            ?>
        </div>
    </div>
</div>