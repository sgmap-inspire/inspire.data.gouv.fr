import React from 'react'
import PropTypes from 'prop-types'
import qs from 'querystring'
import { Link, withRouter } from 'react-router-dom'
import { translate } from 'react-i18next'

import SearchInput from 'common/components/SearchInput'
import CatalogPreview from 'common/components/CatalogPreview'
import NewsletterForm from 'common/components/Newsletter/NewsletterForm'

import styles from './HomePage.scss'
import clouds from '../../../../components/PageLayout/images/clouds.svg'

class HomePage extends React.PureComponent {
  static propTypes = {
    catalogs: PropTypes.arrayOf(PropTypes.shape({
      _id: PropTypes.string.isRequired
    })).isRequired,

    history: PropTypes.shape({
      push: PropTypes.func.isRequired
    }).isRequired,

    t: PropTypes.func.isRequired
  }

  onSearch = value => {
    const { history } = this.props

    history.push({
      pathname: '/search',
      search: qs.stringify({
        q: value,
        availability: 'yes'
      })
    })
  }

  render() {
    const { catalogs, t } = this.props

    return (
      <div>
        <div className={styles.container} style={{ background: `url(${clouds}) bottom / 101% no-repeat, linear-gradient(to top, #41dcd7, #3083b2)` }}>
          <div className={styles.masthead}>
            <h1>
              {t('HomePage.tagline')}
            </h1>
            <SearchInput
              placeholder={t('HomePage.SearchInputPlaceholder')}
              onSearch={this.onSearch}
              hasButton
            />
            <Link className={styles.datasetLinks} to='/search?availability=yes'>{t('HomePage.datasetsLink')}</Link>
          </div>

          <div className={styles.datagouv}>
            <div className={styles.paper}>
              <h2>{t('HomePage.catalogsSectionTitle')}</h2>
              <div className={styles.catalogs}>
                {catalogs.map(catalog => (
                  <div key={catalog._id} className={styles.catalog}>
                    <CatalogPreview catalog={catalog} />
                  </div>
                ))}
              </div>
              <Link to='catalogs' className={styles.link}>{t('HomePage.catalogsLink')}</Link>

              <h2 id='evenements'>{t('HomePage.eventsSectionTitle')}</h2>
              <div>
                <Link to='events' className={styles.link}>{t('HomePage.eventsLink')}</Link>
              </div>
            </div>
          </div>
        </div>

        <NewsletterForm />
      </div>
    )
  }
}

export default withRouter(translate('Home')(HomePage))
