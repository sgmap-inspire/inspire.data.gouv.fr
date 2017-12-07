import React from 'react'
import PropTypes from 'prop-types'
import { flowRight } from 'lodash'
import { withRouter } from 'next/router'
import { translate } from 'react-i18next'

import withSession from './hoc/with-session'

import Info from './info'
import Button from './button'

import { PUBLIC_URL, PUBLICATION_BASE_URL } from '@env'

class RequireAuth extends React.Component {
  static propTypes = {
    message: PropTypes.string,
    session: PropTypes.shape({
      clear: PropTypes.func.isRequired
    }),
    router: PropTypes.shape({
      asPath: PropTypes.string.isRequired
    }).isRequired,

    render: PropTypes.func.isRequired,

    t: PropTypes.func.isRequired
  }

  render() {
    const { session, router, message, t } = this.props

    const currentUrl = `${PUBLIC_URL}${router.asPath}`
    const loginUrl = `${PUBLICATION_BASE_URL}/login?redirect=${encodeURIComponent(currentUrl)}`

    if (!session) {
      return t('loading')
    }

    if (!session.user) {
      return (
        <div className='container'>
          {message && (
            <div className='message'>
              <Info>{message}</Info>
            </div>
          )}

          <div className='buttons'>
            <Button href={loginUrl}>
              {t('auth.login')}
            </Button>
            <Button href='https://id.data.gouv.fr/register/'>
              {t('auth.register')}
            </Button>
          </div>

          <style jsx>{`
            .container {
              text-align: left;
            }

            .message {
              margin-bottom: 1em;
            }

            .buttons {
              :global(button) {
                margin-right: 5px;
              }
            }
          `}</style>
        </div>
      )
    }

    return this.props.render(session.user)
  }
}

export default flowRight(
  translate(),
  withRouter,
  withSession
)(RequireAuth)
