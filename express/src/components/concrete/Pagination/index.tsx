/* tslint:disable:max-line-length */
import * as React from 'react';
import ReactPaginate from 'react-paginate';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { margin, padding, pagestyles } from '@src/styles';

// Components
import { Chevron } from '@src/components/concrete/Icons/svgs';

type Props = {
  currentPage: number;
  lastPage: number;
};

type State = {
  chosenPage: number;
};

class Pagination extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { chosenPage: this.props.currentPage };
  }

  handlePageClick = ({ selected }) => {
    this.setState({ chosenPage: selected + 1 });
  }

  render() {
    const { currentPage, lastPage } = this.props;
    const { chosenPage } = this.state;
    return (
      <div>
        <div className={css(styles.paginateWrapper)}>
          <div className={css(styles.paginateContainer)}>
            <div className={css(margin.bottom_5)}>
              <nav
                data-id="SearchResultsPagination"
                role="navigation"
              >
                <span>
                  <div>
                    <ReactPaginate
                      activeClassName={css(styles.active)}
                      activeLinkClassName={css(styles.activeLink)}
                      breakClassName={css(styles.listItem)}
                      breakLabel={
                        <div className={css(styles.break)}>
                          ...
                        </div>
                      }
                      containerClassName={css(styles.pagination, margin.all_0, padding.all_0)}
                      forcePage={(currentPage || 1) - 1}
                      marginPagesDisplayed={1}
                      nextClassName={css(chosenPage === lastPage ? pagestyles.none : [styles.listItem, styles.page, margin.right_1])}
                      nextLabel={
                        <div className={css(styles.arrowButton)}>
                          <Chevron
                            direction="right"
                            role="img"
                            stylesArray={[styles.icon, pagestyles.icon]}
                          />
                        </div>
                      }
                      onPageChange={this.handlePageClick}
                      pageClassName={css(styles.listItem, styles.page, margin.right_1)}
                      pageCount={lastPage}
                      pageLinkClassName={css(styles.pageLink)}
                      pageRangeDisplayed={2}
                      previousClassName={css(chosenPage === 1 ? pagestyles.none : [styles.listItem, styles.page, margin.right_1])}
                      previousLabel={
                        <div className={css(styles.arrowButton)}>
                          <Chevron
                            direction="left"
                            role="img"
                            stylesArray={[styles.icon, pagestyles.icon]}
                          />
                        </div>
                      }
                    />
                  </div>
                </span>
              </nav>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Pagination;
