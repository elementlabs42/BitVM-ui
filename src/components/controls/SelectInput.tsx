import styled from 'styled-components'
import { Children, ReactElement, ReactNode, useEffect, useRef, useState } from 'react'
import { InputContainer, InputStyle, withLabel, Hidden, HIDDEN_Z_INDEX } from './common'
import { RoundedIcon, Warning } from '.'
import { ChevronDown } from '../icons'
import { Borders } from '@/constants/themes'
import { Checked } from '../icons/history'

interface Props {
  label: ReactNode
  validate?: (valid: boolean) => void
  select?: (key: string) => void
  placeHolder?: ReactNode
  children?: ReactNode
  className?: string
}

const FADE_OUT_DURATION = 120

export function SelectInput({ label, validate, select, placeHolder = '', children, className }: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const iconRef = useRef<SVGSVGElement>(null)
  const items = Children.toArray(children)
  const itemsRef = useRef<HTMLDivElement[] | null[]>([])
  const [open, setOpen] = useState(false)
  const [onceOpened, setOnceOpened] = useState(false)
  const [selectedKey, setSelectedKey] = useState<string | null>()
  const [selected, setSelected] = useState<Element | null>(null)
  const [warning, setWarning] = useState<ReactElement>()

  const toggleSelect = () => {
    if (!open) {
      openSelect()
    } else {
      closeSelect()
    }
  }

  const onSelect = (e: React.MouseEvent) => {
    setSelectedKey(e.currentTarget.getAttribute('data-key'))
    closeSelect()
  }

  const openSelect = () => {
    const node = wrapperRef.current
    const icon = iconRef.current
    if (node && icon) {
      node.style['opacity'] = '1'
      node.style['transform'] = 'scale(1)'
      icon.style['transform'] = 'rotate(180deg)'
      setOpen(true)
      setTimeout(() => {
        node.style['transform'] = 'none'
      })
    }
  }

  const closeSelect = () => {
    const node = wrapperRef.current
    const icon = iconRef.current
    if (node && icon) {
      node.style['opacity'] = '0'
      icon.style['transform'] = 'rotate(0deg)'
      setOpen(false)
      setTimeout(() => {
        node.style['transform'] = 'scale(0)'
        setOnceOpened(true)
      }, FADE_OUT_DURATION)
    }
  }

  useEffect(() => {
    const itemRef = itemsRef.current.find((el) => el?.getAttribute('data-key') === selectedKey)
    if (itemRef) {
      setSelected(itemRef.children.item(0))
      if (select) {
        select(selectedKey ?? '')
      }
    }
  }, [selectedKey, select])

  useEffect(() => {
    setWarning(onceOpened && !selected ? <Warning text="Please select an option" /> : undefined)
    if (validate) {
      validate(!!selected)
    }
  }, [onceOpened, selected, validate])

  const selection = selected ? (
    <Selection dangerouslySetInnerHTML={{ __html: selected.outerHTML }} />
  ) : (
    <Selection>{placeHolder != '' && <PlaceHolder>{placeHolder}</PlaceHolder>}</Selection>
  )

  const input = (
    <Container>
      <SelectContainer className={className} onClick={toggleSelect}>
        {selection}
        <Icon icon={<IconSvg iconRef={iconRef} />} noBorder={true} size={1} />
      </SelectContainer>
      <Items ref={wrapperRef}>
        {open && <Hidden onClick={toggleSelect} />}
        <ItemContent>
          {items.map((item, i) => (
            <Item
              key={i}
              data-key={i.toString()}
              onClick={onSelect}
              ref={(el) => {
                itemsRef.current[i] = el
              }}
            >
              {item}
              {selectedKey === i.toString() && <Checked />}
            </Item>
          ))}
        </ItemContent>
      </Items>
    </Container>
  )
  return withLabel({
    label,
    warning,
    input,
    className,
  })
}

const Container = styled.div`
  position: relative;
`

const SelectContainer = styled(InputContainer)`
  cursor: pointer;
`

const Selection = styled.div`
  ${InputStyle}
`

const Icon = styled(RoundedIcon)`
  margin-right: 1em;
`

const IconSvg = styled(ChevronDown)`
  transition: transform 0.2s ease-out;
`

const PlaceHolder = styled.span`
  color: ${({ theme }) => theme.FooterText};
`
const Items = styled.div`
  position: absolute;
  opacity: 0;
  transform: scale(0);
  transform-origin: top left;
  transition:
    opacity 200ms ease-out,
    transform ${FADE_OUT_DURATION}ms ease-out;
  background-color: ${({ theme }) => theme.Background};
  width: 100%;
  z-index: ${HIDDEN_Z_INDEX + 1};
`

const ItemContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.5em 0;
  justify-content: space-between;
  border: 1px solid ${({ theme }) => theme.FooterText};
  border-radius: ${Borders.ButtonRadius};
  box-shadow:
    0px 20px 24px -4px ${({ theme }) => theme.ShadowInner},
    0px 8px 8px -4px ${({ theme }) => theme.ShadowOuter};
  > * {
    z-index: ${HIDDEN_Z_INDEX + 1};
    overflow: hidden;
    padding: 0.5em 1em;
    cursor: pointer;
  }
  > *:hover {
    background-color: ${({ theme }) => theme.HoverArea};
  }
`

const Item = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`
