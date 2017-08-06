import React, { Component } from 'react'
import { uiGroups, spacing, borderSizes } from '../utils/theme'

class Tabs extends Component {
  state = {
    currentTabIndex: 0,
  }

  handleTabChange = currentTabIndex => {
    this.setState({
      currentTabIndex,
    })
  }

  render() {
    const { currentTabIndex } = this.state
    const { tabs } = this.props
    return (
      <header>
        <nav
          style={{
            display: 'flex',
            marginBottom: spacing.medium,
            border: `${borderSizes.small}px solid ${uiGroups.backgroundShade}`,
            borderBottom: 0,
          }}
        >
          {tabs.map((tab, index) =>
            <a
              key={tab.title}
              onClick={() => this.handleTabChange(index)}
              style={{
                flexGrow: 1,
                textAlign: 'center',
                padding: spacing.medium,
                background:
                  currentTabIndex === index
                    ? uiGroups.background
                    : uiGroups.backgroundShade,
                color:
                  currentTabIndex === index
                    ? uiGroups.userCurrentState
                    : uiGroups.gray3,
              }}
            >
              {tab.title}
            </a>
          )}
        </nav>
        <section key={currentTabIndex}>
          {tabs[currentTabIndex].render}
        </section>
      </header>
    )
  }
}

export default Tabs
