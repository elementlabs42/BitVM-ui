import Link from 'next/link'
import React from 'react'
import styled from 'styled-components'

interface Props {
  textColor?: string
  className?: string
}

const LogoIcon = () => {
  return (
    <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_dd_841_7009)">
<path d="M3.1 14.8C3.1 12.5581 3.10008 10.8828 3.20866 9.55376C3.31715 8.22593 3.53345 7.25268 3.96105 6.41348C4.71845 4.92699 5.92699 3.71845 7.41348 2.96105C8.25268 2.53345 9.22593 2.31715 10.5538 2.20866C11.8828 2.10008 13.5581 2.1 15.8 2.1H22.2C24.4419 2.1 26.1172 2.10008 27.4462 2.20866C28.7741 2.31715 29.7473 2.53345 30.5865 2.96105C32.073 3.71845 33.2816 4.92699 34.039 6.41348C34.4665 7.25268 34.6828 8.22593 34.7913 9.55376C34.8999 10.8828 34.9 12.5581 34.9 14.8V21.2C34.9 23.4419 34.8999 25.1172 34.7913 26.4462C34.6828 27.7741 34.4665 28.7473 34.039 29.5865C33.2816 31.073 32.073 32.2816 30.5865 33.039C29.7473 33.4665 28.7741 33.6828 27.4462 33.7913C26.1172 33.8999 24.4419 33.9 22.2 33.9H15.8C13.5581 33.9 11.8828 33.8999 10.5538 33.7913C9.22593 33.6828 8.25268 33.4665 7.41348 33.039C5.92699 32.2816 4.71845 31.073 3.96105 29.5865C3.53345 28.7473 3.31715 27.7741 3.20866 26.4462C3.10008 25.1172 3.1 23.4419 3.1 21.2V14.8Z" fill="white"/>
<path d="M3.1 14.8C3.1 12.5581 3.10008 10.8828 3.20866 9.55376C3.31715 8.22593 3.53345 7.25268 3.96105 6.41348C4.71845 4.92699 5.92699 3.71845 7.41348 2.96105C8.25268 2.53345 9.22593 2.31715 10.5538 2.20866C11.8828 2.10008 13.5581 2.1 15.8 2.1H22.2C24.4419 2.1 26.1172 2.10008 27.4462 2.20866C28.7741 2.31715 29.7473 2.53345 30.5865 2.96105C32.073 3.71845 33.2816 4.92699 34.039 6.41348C34.4665 7.25268 34.6828 8.22593 34.7913 9.55376C34.8999 10.8828 34.9 12.5581 34.9 14.8V21.2C34.9 23.4419 34.8999 25.1172 34.7913 26.4462C34.6828 27.7741 34.4665 28.7473 34.039 29.5865C33.2816 31.073 32.073 32.2816 30.5865 33.039C29.7473 33.4665 28.7741 33.6828 27.4462 33.7913C26.1172 33.8999 24.4419 33.9 22.2 33.9H15.8C13.5581 33.9 11.8828 33.8999 10.5538 33.7913C9.22593 33.6828 8.25268 33.4665 7.41348 33.039C5.92699 32.2816 4.71845 31.073 3.96105 29.5865C3.53345 28.7473 3.31715 27.7741 3.20866 26.4462C3.10008 25.1172 3.1 23.4419 3.1 21.2V14.8Z" fill="#0D3C9E"/>
<path d="M3.1 14.8C3.1 12.5581 3.10008 10.8828 3.20866 9.55376C3.31715 8.22593 3.53345 7.25268 3.96105 6.41348C4.71845 4.92699 5.92699 3.71845 7.41348 2.96105C8.25268 2.53345 9.22593 2.31715 10.5538 2.20866C11.8828 2.10008 13.5581 2.1 15.8 2.1H22.2C24.4419 2.1 26.1172 2.10008 27.4462 2.20866C28.7741 2.31715 29.7473 2.53345 30.5865 2.96105C32.073 3.71845 33.2816 4.92699 34.039 6.41348C34.4665 7.25268 34.6828 8.22593 34.7913 9.55376C34.8999 10.8828 34.9 12.5581 34.9 14.8V21.2C34.9 23.4419 34.8999 25.1172 34.7913 26.4462C34.6828 27.7741 34.4665 28.7473 34.039 29.5865C33.2816 31.073 32.073 32.2816 30.5865 33.039C29.7473 33.4665 28.7741 33.6828 27.4462 33.7913C26.1172 33.8999 24.4419 33.9 22.2 33.9H15.8C13.5581 33.9 11.8828 33.8999 10.5538 33.7913C9.22593 33.6828 8.25268 33.4665 7.41348 33.039C5.92699 32.2816 4.71845 31.073 3.96105 29.5865C3.53345 28.7473 3.31715 27.7741 3.20866 26.4462C3.10008 25.1172 3.1 23.4419 3.1 21.2V14.8Z" stroke="#D0D5DD" stroke-width="0.2"/>
<path d="M14.5 10H21.5053C22.3517 10 23.0887 10.1044 23.7163 10.3133C24.3584 10.5072 24.8838 10.7907 25.2925 11.1636C26.1243 11.9245 26.5403 12.924 26.5403 14.1622C26.5403 14.9828 26.3141 15.6615 25.8616 16.1986C25.4238 16.7207 24.8328 17.1086 24.0884 17.3622V17.4294C24.9641 17.683 25.6646 18.1604 26.19 18.8615C26.73 19.5627 27 20.4056 27 21.3902C27 22.1511 26.8832 22.8 26.6497 23.3371C26.4308 23.8592 26.0879 24.3217 25.6208 24.7245C25.1684 25.1273 24.6065 25.4406 23.9352 25.6643C23.2639 25.8881 22.5123 26 21.6804 26H14.5V10ZM17.6743 23.3147H21.3301C22.1036 23.3147 22.702 23.1207 23.1252 22.7329C23.563 22.3301 23.782 21.8005 23.782 21.1441C23.782 20.3832 23.5412 19.8089 23.0595 19.421C22.5779 19.0331 21.9723 18.8392 21.2426 18.8392H17.6743V23.3147ZM21.1112 16.4448C21.8117 16.4448 22.3736 16.2807 22.7968 15.9524C23.2201 15.6242 23.4317 15.1469 23.4317 14.5203C23.4317 13.9235 23.2274 13.4611 22.8187 13.1329C22.4247 12.8047 21.8774 12.6406 21.1769 12.6406H17.6743V16.4448H21.1112Z" fill="white"/>
<path d="M14.5 10V12.5H11L11 10L14.5 10Z" fill="white"/>
<path d="M14.5 16.5V19H11L11 16.5H14.5Z" fill="white"/>
<path d="M14.5 23.5V26H11L11 23.5H14.5Z" fill="white"/>
</g>
<defs>
<filter id="filter0_dd_841_7009" x="0" y="0" width="38" height="38" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="1"/>
<feGaussianBlur stdDeviation="1"/>
<feColorMatrix type="matrix" values="0 0 0 0 0.0627451 0 0 0 0 0.0941176 0 0 0 0 0.156863 0 0 0 0.06 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_841_7009"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="1"/>
<feGaussianBlur stdDeviation="1.5"/>
<feColorMatrix type="matrix" values="0 0 0 0 0.0627451 0 0 0 0 0.0941176 0 0 0 0 0.156863 0 0 0 0.1 0"/>
<feBlend mode="normal" in2="effect1_dropShadow_841_7009" result="effect2_dropShadow_841_7009"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_841_7009" result="shape"/>
</filter>
</defs>
</svg>

  )
}
const LogoBrandIcon = () => {
  return (
    <svg width="100" height="32" viewBox="0 0 100 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.2016 8.30067H20.3347V23.6564H17.2016V8.30067Z" fill="#010610"/>
    <path d="M22.7296 8.30067H33.7927V10.9423H25.8627V14.6362H32.5827V17.2993H25.8627V23.6564H22.7296V8.30067Z" fill="#010610"/>
    <path d="M35.5591 8.30067H42.6464C43.3955 8.30067 44.0725 8.40805 44.6776 8.62282C45.297 8.82327 45.8228 9.10962 46.2549 9.48188C46.6871 9.85414 47.0184 10.3051 47.2489 10.8349C47.4937 11.3503 47.6162 11.9302 47.6162 12.5745C47.6162 13.4765 47.3929 14.2568 46.9464 14.9154C46.4998 15.5597 45.7795 16.0179 44.7856 16.2899V16.3544C45.4914 16.5548 46.0316 16.8913 46.4062 17.3638C46.7951 17.8219 47.04 18.5163 47.1408 19.447C47.1984 19.9911 47.2345 20.4993 47.2489 20.9718C47.2777 21.43 47.3065 21.838 47.3353 22.196C47.3785 22.5539 47.4361 22.8474 47.5082 23.0765C47.5802 23.3056 47.681 23.4488 47.8107 23.506V23.6564H44.8072C44.7064 23.6134 44.6271 23.4846 44.5695 23.2698C44.5119 23.0407 44.4615 22.7615 44.4183 22.4322C44.3895 22.1029 44.3606 21.7378 44.3318 21.3369C44.303 20.936 44.2742 20.528 44.2454 20.1128C44.1734 19.268 43.8925 18.6237 43.4027 18.1799C42.9273 17.7217 42.1999 17.4926 41.2203 17.4926H38.6922V23.6564H35.5591V8.30067ZM38.6922 15.0872H42.0198C42.8841 15.0872 43.5252 14.894 43.9429 14.5074C44.3606 14.1065 44.5695 13.5982 44.5695 12.9826C44.5695 12.3526 44.3678 11.8371 43.9645 11.4362C43.5612 11.021 42.9417 10.8134 42.1062 10.8134H38.6922V15.0872Z" fill="#010610"/>
    <path d="M56.4184 24C55.2804 24 54.2505 23.7996 53.3285 23.3987C52.4066 22.9978 51.6215 22.4465 50.9733 21.745C50.3251 21.0291 49.8281 20.1843 49.4824 19.2107C49.1367 18.2228 48.9638 17.1562 48.9638 16.0107C48.9638 14.8653 49.1367 13.8058 49.4824 12.8322C49.8281 11.8443 50.3251 10.9924 50.9733 10.2765C51.6215 9.56063 52.4066 9.00224 53.3285 8.60134C54.2505 8.20045 55.2804 8 56.4184 8C57.5564 8 58.5792 8.20045 59.4867 8.60134C60.4086 9.00224 61.1937 9.56063 61.8419 10.2765C62.4902 10.9924 62.9871 11.8443 63.3329 12.8322C63.6786 13.8058 63.8514 14.8653 63.8514 16.0107C63.8514 17.1562 63.6786 18.2228 63.3329 19.2107C62.9871 20.1843 62.4902 21.0291 61.8419 21.745C61.1937 22.4465 60.4086 22.9978 59.4867 23.3987C58.5792 23.7996 57.5564 24 56.4184 24ZM56.44 21.4443C57.1459 21.4443 57.7581 21.3083 58.2767 21.0362C58.8097 20.7499 59.249 20.3633 59.5947 19.8765C59.9549 19.3897 60.2214 18.817 60.3942 18.1584C60.5671 17.4855 60.6535 16.7696 60.6535 16.0107C60.6535 15.2376 60.5671 14.5217 60.3942 13.8631C60.2214 13.2045 59.9549 12.6318 59.5947 12.145C59.249 11.6438 58.8097 11.2573 58.2767 10.9852C57.7581 10.6989 57.1459 10.5557 56.44 10.5557C55.7342 10.5557 55.1148 10.6989 54.5818 10.9852C54.0488 11.2573 53.6022 11.6438 53.2421 12.145C52.882 12.6318 52.6083 13.2045 52.421 13.8631C52.2482 14.5217 52.1617 15.2376 52.1617 16.0107C52.1617 16.7696 52.2482 17.4855 52.421 18.1584C52.6083 18.817 52.882 19.3897 53.2421 19.8765C53.6022 20.3633 54.0488 20.7499 54.5818 21.0362C55.1148 21.3083 55.7342 21.4443 56.44 21.4443Z" fill="#010610"/>
    <path d="M71.5503 24C69.4472 24 67.8194 23.5633 66.667 22.6899C65.529 21.8022 64.9312 20.5423 64.8736 18.9101H67.9419C68.0571 19.8407 68.3884 20.5065 68.9358 20.9074C69.4832 21.294 70.3115 21.4872 71.4207 21.4872C71.824 21.4872 72.2058 21.4515 72.5659 21.3799C72.926 21.3083 73.2429 21.1937 73.5166 21.0362C73.7903 20.8787 74.0064 20.6783 74.1649 20.4349C74.3377 20.1772 74.4242 19.8694 74.4242 19.5114C74.4242 19.1391 74.3305 18.8313 74.1433 18.5879C73.9704 18.3445 73.7183 18.1441 73.387 17.9866C73.0557 17.8148 72.6523 17.6716 72.177 17.557C71.716 17.4282 71.1902 17.2993 70.5996 17.1705C69.9082 17.013 69.2383 16.8412 68.5901 16.655C67.9563 16.4546 67.3945 16.1897 66.9047 15.8604C66.4293 15.5311 66.0404 15.1087 65.7379 14.5933C65.4498 14.0779 65.3057 13.4192 65.3057 12.6175C65.3057 11.8586 65.4498 11.1928 65.7379 10.6201C66.0404 10.0474 66.4509 9.56779 66.9695 9.18121C67.5025 8.79463 68.1291 8.50828 68.8494 8.32215C69.5696 8.1217 70.3619 8.02148 71.2262 8.02148C72.9692 8.02148 74.3665 8.42953 75.4181 9.24564C76.4841 10.0617 77.0747 11.2501 77.1899 12.8107H74.1865C74.1 12.0376 73.7831 11.4577 73.2357 11.0711C72.6883 10.6846 72.0113 10.4913 71.2046 10.4913C70.3547 10.4913 69.6777 10.6559 69.1735 10.9852C68.6693 11.3145 68.4172 11.7512 68.4172 12.2953C68.4172 12.6103 68.4821 12.8752 68.6117 13.0899C68.7558 13.2904 68.9646 13.4694 69.2383 13.6268C69.5264 13.7843 69.8793 13.9204 70.2971 14.0349C70.7148 14.1494 71.2118 14.2711 71.788 14.4C72.5803 14.5718 73.3222 14.7651 74.0136 14.9799C74.7195 15.1803 75.3317 15.4523 75.8503 15.796C76.3833 16.1396 76.801 16.5763 77.1035 17.106C77.406 17.6358 77.5573 18.3159 77.5573 19.1463C77.5573 19.9195 77.406 20.6139 77.1035 21.2295C76.801 21.8309 76.3833 22.3392 75.8503 22.7544C75.3173 23.1553 74.6834 23.4631 73.9488 23.6779C73.2141 23.8926 72.4147 24 71.5503 24Z" fill="#010610"/>
    <path d="M77.9749 8.30067H90.3993V10.9208H85.7536V23.6564H82.6205V10.9208H77.9749V8.30067Z" fill="#010610"/>
    <path d="M3.34688 8.3H10.0456C10.8551 8.3 11.5599 8.39986 12.1599 8.59958C12.774 8.78504 13.2764 9.05608 13.6672 9.41273C14.4627 10.1403 14.8604 11.0961 14.8604 12.2801C14.8604 13.0648 14.6441 13.7138 14.2114 14.2274C13.7928 14.7267 13.2276 15.0976 12.5158 15.3401V15.4043C13.3532 15.6469 14.023 16.1034 14.5255 16.7738C15.0418 17.4443 15.3 18.2503 15.3 19.1919C15.3 19.9194 15.1884 20.54 14.9651 21.0536C14.7557 21.5529 14.4278 21.9951 13.9812 22.3803C13.5485 22.7655 13.0113 23.065 12.3693 23.279C11.7273 23.493 11.0086 23.6 10.2131 23.6H3.34688V8.3ZM6.38226 21.0322H9.87818C10.6178 21.0322 11.19 20.8467 11.5947 20.4758C12.0134 20.0906 12.2227 19.5842 12.2227 18.9565C12.2227 18.229 11.9925 17.6797 11.5319 17.3088C11.0714 16.9379 10.4922 16.7524 9.79444 16.7524H6.38226V21.0322ZM9.66884 14.4628C10.3387 14.4628 10.876 14.3059 11.2807 13.992C11.6855 13.6782 11.8878 13.2217 11.8878 12.6225C11.8878 12.0519 11.6924 11.6097 11.3017 11.2958C10.9249 10.982 10.4015 10.825 9.73164 10.825H6.38226V14.4628H9.66884Z" fill="#010610"/>
    <path d="M3.34688 8.3V10.6906L0 10.6906L1.04497e-07 8.3L3.34688 8.3Z" fill="#010610"/>
    <path d="M3.34688 14.5156V16.9063H0L1.04497e-07 14.5156H3.34688Z" fill="#010610"/>
    <path d="M3.34688 21.2094V23.6H0L1.04497e-07 21.2094H3.34688Z" fill="#010610"/>
    </svg>
  )
}

export function Logo({ className }: Props) {
  return (
    <Link href="/">
    <Content className={className}>
      <LogoIcon />
      <div style={{ marginLeft: '10px' }}>
        <LogoBrandIcon />
      </div>
    </Content>
    </Link>
  )
}

const Content = styled.div`
  display: inline-flex;
  align-items: center;
  cursor: pointer;
`
