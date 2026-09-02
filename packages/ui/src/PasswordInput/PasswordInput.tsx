import { forwardRef, useState } from 'react'
import { Icon, TbIcons } from '@vn-dylan/icons'
import { classNames } from '@vn-dylan/utils'
import { Input } from '../Input'
import type { PasswordInputProps } from './types'
import './PasswordInput.scss'

/**
 * Password input with a visibility toggle.
 */
export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  function PasswordInput({ onVisibleChange, suffix, disabled = false, className, ...rest }, ref) {
    const [visible, setVisible] = useState(false)

    const toggleVisible = () => {
      const next = !visible
      setVisible(next)
      onVisibleChange?.(next)
    }

    return (
      <Input
        ref={ref}
        type={visible ? 'text' : 'password'}
        disabled={disabled}
        suffix={
          <span className="dyl-password-input__suffix">
            {suffix}
            <button
              type="button"
              className="dyl-password-input__visibility"
              aria-label={visible ? 'Hide password' : 'Show password'}
              aria-pressed={visible}
              disabled={disabled}
              onClick={toggleVisible}
            >
              <Icon as={visible ? TbIcons.TbEyeOff : TbIcons.TbEye} />
            </button>
          </span>
        }
        className={classNames('dyl-password-input', className)}
        {...rest}
      />
    )
  },
)
