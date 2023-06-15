import React, { FC, MouseEvent, useContext, useState, useEffect } from 'react'
import { context, Link, NavLink } from 'dumi/theme'
import { setTheme } from '../theme/index';
import './Navbar.less'
import p from '../../../package.json'
import SearchBar from './SearchBar'

interface INavbarProps {
  theme: any
  onMobileMenuClick: (ev: MouseEvent<HTMLButtonElement>) => void
}

const Navbar: FC<INavbarProps> = ({
  onMobileMenuClick,
  theme,
}) => {
  const {
    base,
    config: { mode, title, logo },
    nav: navItems,
  } = useContext(context)

  const [currentTheme, setCurrentTheme] = useState('Default');
  // compare current theme with real theme
  setTimeout(() => {
    setTheme(currentTheme);
  }, 800)

  return (
    <div className='__dumi-default-navbar' data-mode={mode}>
      {/* menu toogle button (only for mobile) */}
      <button
        className='__dumi-default-navbar-toggle'
        onClick={onMobileMenuClick}
      />
      {/* logo & title */}
      <div>
        <Link
          className='__dumi-default-navbar-logo'
          style={{
            backgroundImage: logo ? `url('${logo}')` : undefined,
          }}
          to={base}
          data-plaintext={logo === false || undefined}
        >
          {title}
        </Link>
        <div className='__dumi-default-navbar-version'>{`v${p.version}`}</div>
      </div>
      <nav>
        <div className='nav-item'>
          <SearchBar />
        </div>
        <div className='__dumi-default-select nav-item'>
          <select
            value={theme}
            onChange={evt => {
              const currentVal = evt.target.value;
              if (currentVal !== currentTheme) {
                setCurrentTheme(currentVal)
                setTheme(currentVal);
              }
            }}
          >
            <option value="Default" key={'lazada'}>
              Lazada 主题
              </option>
              <option value="Arise" key={'arise'}>
              Arise 主题
              </option>
          </select>
        </div>
        {navItems.map(nav => {
          const child = Boolean(nav.children?.length) && (
            <ul>
              {nav.children.map(
                item =>
                  !!item.path && (
                    <li key={item.path}>
                      <NavLink to={item.path}>{item.title}</NavLink>
                    </li>
                  )
              )}
            </ul>
          )

          return (
            <span key={nav.title || nav.path}>
              {nav.path ? (
                <NavLink to={nav.path} key={nav.path}>
                  {nav.title}
                </NavLink>
              ) : (
                nav.title
              )}
              {child}
            </span>
          )
        })}
      </nav>
    </div>
  )
}

export default Navbar
