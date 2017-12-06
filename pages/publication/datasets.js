import React from 'react'
import PropTypes from 'prop-types'
import { flowRight } from 'lodash'

import withI18n from '../../components/hoc/with-i18n'
import withAuth from '../../components/hoc/with-auth'
import withSession from '../../components/hoc/with-session'

import Page from '../../components/page'
import Meta from '../../components/meta'
import Content from '../../components/content'
import Container from '../../components/container'
import RequireAuth from '../../components/require-auth'

import Header from '../../components/publication/header'
import Breadcrumbs from '../../components/publication/breadcrumbs'

class PublicationPage extends React.Component {
  static propTypes = {
    organizationId: PropTypes.string.isRequired
  }

  static getInitialProps({ query }) {
    return {
      organizationId: query.oid
    }
  }
  renderAuth = user => {
    const { organizationId } = this.props
    const organization = user.organizations.find(org => org.id === organizationId)

    return (
      <div>
        <Meta title={`Jeux de données | ${organization.name} | Publication`} />

        <Header user={user} organization={organization} />
        <Breadcrumbs organization={organization} page='datasets' />
      </div>
    )
  }

  render() {
    return (
      <Page>
        <Meta title='Publication' />
        <Content>
          <Container fluid>
            <RequireAuth
              message='Vous devez être connecté pour accéder à l’interface de publication.'
              render={this.renderAuth}
            />
          </Container>
        </Content>
      </Page>
    )
  }
}

export default flowRight(
  withI18n(),
  withAuth(),
  withSession()
)(PublicationPage)
