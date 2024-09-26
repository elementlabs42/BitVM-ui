import React from 'react'
import styled from 'styled-components'

interface Props {
  className?: string
}

export function Logo({ className }: Props) {
  return (
    <Content className={className}>
      <svg width="145" height="38" viewBox="0 0 145 38" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g filter="url(#filter0_dd_430_4587)">
          <path d="M3.1 14.8C3.1 12.5581 3.10008 10.8828 3.20866 9.55376C3.31715 8.22593 3.53345 7.25268 3.96105 6.41348C4.71845 4.92699 5.92699 3.71845 7.41348 2.96105C8.25268 2.53345 9.22593 2.31715 10.5538 2.20866C11.8828 2.10008 13.5581 2.1 15.8 2.1H22.2C24.4419 2.1 26.1172 2.10008 27.4462 2.20866C28.7741 2.31715 29.7473 2.53345 30.5865 2.96105C32.073 3.71845 33.2816 4.92699 34.039 6.41348C34.4665 7.25268 34.6828 8.22593 34.7913 9.55376C34.8999 10.8828 34.9 12.5581 34.9 14.8V21.2C34.9 23.4419 34.8999 25.1172 34.7913 26.4462C34.6828 27.7741 34.4665 28.7473 34.039 29.5865C33.2816 31.073 32.073 32.2816 30.5865 33.039C29.7473 33.4665 28.7741 33.6828 27.4462 33.7913C26.1172 33.8999 24.4419 33.9 22.2 33.9H15.8C13.5581 33.9 11.8828 33.8999 10.5538 33.7913C9.22593 33.6828 8.25268 33.4665 7.41348 33.039C5.92699 32.2816 4.71845 31.073 3.96105 29.5865C3.53345 28.7473 3.31715 27.7741 3.20866 26.4462C3.10008 25.1172 3.1 23.4419 3.1 21.2V14.8Z" fill="white" />
          <path d="M3.1 14.8C3.1 12.5581 3.10008 10.8828 3.20866 9.55376C3.31715 8.22593 3.53345 7.25268 3.96105 6.41348C4.71845 4.92699 5.92699 3.71845 7.41348 2.96105C8.25268 2.53345 9.22593 2.31715 10.5538 2.20866C11.8828 2.10008 13.5581 2.1 15.8 2.1H22.2C24.4419 2.1 26.1172 2.10008 27.4462 2.20866C28.7741 2.31715 29.7473 2.53345 30.5865 2.96105C32.073 3.71845 33.2816 4.92699 34.039 6.41348C34.4665 7.25268 34.6828 8.22593 34.7913 9.55376C34.8999 10.8828 34.9 12.5581 34.9 14.8V21.2C34.9 23.4419 34.8999 25.1172 34.7913 26.4462C34.6828 27.7741 34.4665 28.7473 34.039 29.5865C33.2816 31.073 32.073 32.2816 30.5865 33.039C29.7473 33.4665 28.7741 33.6828 27.4462 33.7913C26.1172 33.8999 24.4419 33.9 22.2 33.9H15.8C13.5581 33.9 11.8828 33.8999 10.5538 33.7913C9.22593 33.6828 8.25268 33.4665 7.41348 33.039C5.92699 32.2816 4.71845 31.073 3.96105 29.5865C3.53345 28.7473 3.31715 27.7741 3.20866 26.4462C3.10008 25.1172 3.1 23.4419 3.1 21.2V14.8Z" fill="#0D3C9E" />
          <path d="M3.1 14.8C3.1 12.5581 3.10008 10.8828 3.20866 9.55376C3.31715 8.22593 3.53345 7.25268 3.96105 6.41348C4.71845 4.92699 5.92699 3.71845 7.41348 2.96105C8.25268 2.53345 9.22593 2.31715 10.5538 2.20866C11.8828 2.10008 13.5581 2.1 15.8 2.1H22.2C24.4419 2.1 26.1172 2.10008 27.4462 2.20866C28.7741 2.31715 29.7473 2.53345 30.5865 2.96105C32.073 3.71845 33.2816 4.92699 34.039 6.41348C34.4665 7.25268 34.6828 8.22593 34.7913 9.55376C34.8999 10.8828 34.9 12.5581 34.9 14.8V21.2C34.9 23.4419 34.8999 25.1172 34.7913 26.4462C34.6828 27.7741 34.4665 28.7473 34.039 29.5865C33.2816 31.073 32.073 32.2816 30.5865 33.039C29.7473 33.4665 28.7741 33.6828 27.4462 33.7913C26.1172 33.8999 24.4419 33.9 22.2 33.9H15.8C13.5581 33.9 11.8828 33.8999 10.5538 33.7913C9.22593 33.6828 8.25268 33.4665 7.41348 33.039C5.92699 32.2816 4.71845 31.073 3.96105 29.5865C3.53345 28.7473 3.31715 27.7741 3.20866 26.4462C3.10008 25.1172 3.1 23.4419 3.1 21.2V14.8Z" stroke="#D0D5DD" strokeWidth="0.2" />
          <path d="M14.5 10H21.5053C22.3517 10 23.0887 10.1044 23.7163 10.3133C24.3584 10.5072 24.8838 10.7907 25.2925 11.1636C26.1243 11.9245 26.5403 12.924 26.5403 14.1622C26.5403 14.9828 26.3141 15.6615 25.8616 16.1986C25.4238 16.7207 24.8328 17.1086 24.0884 17.3622V17.4294C24.9641 17.683 25.6646 18.1604 26.19 18.8615C26.73 19.5627 27 20.4056 27 21.3902C27 22.1511 26.8832 22.8 26.6497 23.3371C26.4308 23.8592 26.0879 24.3217 25.6208 24.7245C25.1684 25.1273 24.6065 25.4406 23.9352 25.6643C23.2639 25.8881 22.5123 26 21.6804 26H14.5V10ZM17.6743 23.3147H21.3301C22.1036 23.3147 22.702 23.1207 23.1252 22.7329C23.563 22.3301 23.782 21.8005 23.782 21.1441C23.782 20.3832 23.5412 19.8089 23.0595 19.421C22.5779 19.0331 21.9723 18.8392 21.2426 18.8392H17.6743V23.3147ZM21.1112 16.4448C21.8117 16.4448 22.3736 16.2807 22.7968 15.9524C23.2201 15.6242 23.4317 15.1469 23.4317 14.5203C23.4317 13.9235 23.2274 13.4611 22.8187 13.1329C22.4247 12.8047 21.8774 12.6406 21.1769 12.6406H17.6743V16.4448H21.1112Z" fill="white" />
          <path d="M14.5 10V12.5H11L11 10L14.5 10Z" fill="white" />
          <path d="M14.5 16.5V19H11L11 16.5H14.5Z" fill="white" />
          <path d="M14.5 23.5V26H11L11 23.5H14.5Z" fill="white" />
        </g>
        <path d="M62.2016 10.3007H65.3347V25.6564H62.2016V10.3007Z" fill="#010610" />
        <path d="M67.7296 10.3007H78.7927V12.9423H70.8627V16.6362H77.5827V19.2993H70.8627V25.6564H67.7296V10.3007Z" fill="#010610" />
        <path d="M80.5591 10.3007H87.6464C88.3955 10.3007 89.0725 10.4081 89.6776 10.6228C90.297 10.8233 90.8228 11.1096 91.2549 11.4819C91.6871 11.8541 92.0184 12.3051 92.2489 12.8349C92.4937 13.3503 92.6162 13.9302 92.6162 14.5745C92.6162 15.4765 92.3929 16.2568 91.9464 16.9154C91.4998 17.5597 90.7795 18.0179 89.7856 18.2899V18.3544C90.4914 18.5548 91.0316 18.8913 91.4062 19.3638C91.7951 19.8219 92.04 20.5163 92.1408 21.447C92.1984 21.9911 92.2345 22.4993 92.2489 22.9718C92.2777 23.43 92.3065 23.838 92.3353 24.196C92.3785 24.5539 92.4361 24.8474 92.5082 25.0765C92.5802 25.3056 92.681 25.4488 92.8107 25.506V25.6564H89.8072C89.7064 25.6134 89.6271 25.4846 89.5695 25.2698C89.5119 25.0407 89.4615 24.7615 89.4183 24.4322C89.3895 24.1029 89.3606 23.7378 89.3318 23.3369C89.303 22.936 89.2742 22.528 89.2454 22.1128C89.1734 21.268 88.8925 20.6237 88.4027 20.1799C87.9273 19.7217 87.1999 19.4926 86.2203 19.4926H83.6922V25.6564H80.5591V10.3007ZM83.6922 17.0872H87.0198C87.8841 17.0872 88.5252 16.894 88.9429 16.5074C89.3606 16.1065 89.5695 15.5982 89.5695 14.9826C89.5695 14.3526 89.3678 13.8371 88.9645 13.4362C88.5612 13.021 87.9417 12.8134 87.1062 12.8134H83.6922V17.0872Z" fill="#010610" />
        <path d="M101.418 26C100.28 26 99.2505 25.7996 98.3285 25.3987C97.4066 24.9978 96.6215 24.4465 95.9733 23.745C95.3251 23.0291 94.8281 22.1843 94.4824 21.2107C94.1367 20.2228 93.9638 19.1562 93.9638 18.0107C93.9638 16.8653 94.1367 15.8058 94.4824 14.8322C94.8281 13.8443 95.3251 12.9924 95.9733 12.2765C96.6215 11.5606 97.4066 11.0022 98.3285 10.6013C99.2505 10.2004 100.28 10 101.418 10C102.556 10 103.579 10.2004 104.487 10.6013C105.409 11.0022 106.194 11.5606 106.842 12.2765C107.49 12.9924 107.987 13.8443 108.333 14.8322C108.679 15.8058 108.851 16.8653 108.851 18.0107C108.851 19.1562 108.679 20.2228 108.333 21.2107C107.987 22.1843 107.49 23.0291 106.842 23.745C106.194 24.4465 105.409 24.9978 104.487 25.3987C103.579 25.7996 102.556 26 101.418 26ZM101.44 23.4443C102.146 23.4443 102.758 23.3083 103.277 23.0362C103.81 22.7499 104.249 22.3633 104.595 21.8765C104.955 21.3897 105.221 20.817 105.394 20.1584C105.567 19.4855 105.654 18.7696 105.654 18.0107C105.654 17.2376 105.567 16.5217 105.394 15.8631C105.221 15.2045 104.955 14.6318 104.595 14.145C104.249 13.6438 103.81 13.2573 103.277 12.9852C102.758 12.6989 102.146 12.5557 101.44 12.5557C100.734 12.5557 100.115 12.6989 99.5818 12.9852C99.0488 13.2573 98.6022 13.6438 98.2421 14.145C97.882 14.6318 97.6083 15.2045 97.421 15.8631C97.2482 16.5217 97.1617 17.2376 97.1617 18.0107C97.1617 18.7696 97.2482 19.4855 97.421 20.1584C97.6083 20.817 97.882 21.3897 98.2421 21.8765C98.6022 22.3633 99.0488 22.7499 99.5818 23.0362C100.115 23.3083 100.734 23.4443 101.44 23.4443Z" fill="#010610" />
        <path d="M116.55 26C114.447 26 112.819 25.5633 111.667 24.6899C110.529 23.8022 109.931 22.5423 109.874 20.9101H112.942C113.057 21.8407 113.388 22.5065 113.936 22.9074C114.483 23.294 115.312 23.4872 116.421 23.4872C116.824 23.4872 117.206 23.4515 117.566 23.3799C117.926 23.3083 118.243 23.1937 118.517 23.0362C118.79 22.8787 119.006 22.6783 119.165 22.4349C119.338 22.1772 119.424 21.8694 119.424 21.5114C119.424 21.1391 119.331 20.8313 119.143 20.5879C118.97 20.3445 118.718 20.1441 118.387 19.9866C118.056 19.8148 117.652 19.6716 117.177 19.557C116.716 19.4282 116.19 19.2993 115.6 19.1705C114.908 19.013 114.238 18.8412 113.59 18.655C112.956 18.4546 112.394 18.1897 111.905 17.8604C111.429 17.5311 111.04 17.1087 110.738 16.5933C110.45 16.0779 110.306 15.4192 110.306 14.6175C110.306 13.8586 110.45 13.1928 110.738 12.6201C111.04 12.0474 111.451 11.5678 111.97 11.1812C112.503 10.7946 113.129 10.5083 113.849 10.3221C114.57 10.1217 115.362 10.0215 116.226 10.0215C117.969 10.0215 119.367 10.4295 120.418 11.2456C121.484 12.0617 122.075 13.2501 122.19 14.8107H119.186C119.1 14.0376 118.783 13.4577 118.236 13.0711C117.688 12.6846 117.011 12.4913 116.205 12.4913C115.355 12.4913 114.678 12.6559 114.174 12.9852C113.669 13.3145 113.417 13.7512 113.417 14.2953C113.417 14.6103 113.482 14.8752 113.612 15.0899C113.756 15.2904 113.965 15.4694 114.238 15.6268C114.526 15.7843 114.879 15.9204 115.297 16.0349C115.715 16.1494 116.212 16.2711 116.788 16.4C117.58 16.5718 118.322 16.7651 119.014 16.9799C119.719 17.1803 120.332 17.4523 120.85 17.796C121.383 18.1396 121.801 18.5763 122.104 19.106C122.406 19.6358 122.557 20.3159 122.557 21.1463C122.557 21.9195 122.406 22.6139 122.104 23.2295C121.801 23.8309 121.383 24.3392 120.85 24.7544C120.317 25.1553 119.683 25.4631 118.949 25.6779C118.214 25.8926 117.415 26 116.55 26Z" fill="#010610" />
        <path d="M122.975 10.3007H135.399V12.9208H130.754V25.6564H127.621V12.9208H122.975V10.3007Z" fill="#010610" />
        <path d="M48.3469 10.3H55.0456C55.8551 10.3 56.5599 10.3999 57.1599 10.5996C57.774 10.785 58.2764 11.0561 58.6672 11.4127C59.4627 12.1403 59.8604 13.0961 59.8604 14.2801C59.8604 15.0648 59.6441 15.7138 59.2114 16.2274C58.7928 16.7267 58.2276 17.0976 57.5158 17.3401V17.4043C58.3532 17.6469 59.023 18.1034 59.5255 18.7738C60.0418 19.4443 60.3 20.2503 60.3 21.1919C60.3 21.9194 60.1884 22.54 59.9651 23.0536C59.7557 23.5529 59.4278 23.9951 58.9812 24.3803C58.5485 24.7655 58.0113 25.065 57.3693 25.279C56.7273 25.493 56.0086 25.6 55.2131 25.6H48.3469V10.3ZM51.3823 23.0322H54.8782C55.6178 23.0322 56.19 22.8467 56.5947 22.4758C57.0134 22.0906 57.2227 21.5842 57.2227 20.9565C57.2227 20.229 56.9925 19.6797 56.5319 19.3088C56.0714 18.9379 55.4922 18.7524 54.7944 18.7524H51.3823V23.0322ZM54.6688 16.4628C55.3387 16.4628 55.876 16.3059 56.2807 15.992C56.6855 15.6782 56.8878 15.2217 56.8878 14.6225C56.8878 14.0519 56.6924 13.6097 56.3017 13.2958C55.9249 12.982 55.4015 12.825 54.7316 12.825H51.3823V16.4628H54.6688Z" fill="#010610" />
        <path d="M48.3469 10.3V12.6906L45 12.6906L45 10.3L48.3469 10.3Z" fill="#010610" />
        <path d="M48.3469 16.5156V18.9063H45L45 16.5156H48.3469Z" fill="#010610" />
        <path d="M48.3469 23.2094V25.6H45L45 23.2094H48.3469Z" fill="#010610" />
        <defs>
          <filter id="filter0_dd_430_4587" x="0" y="0" width="38" height="38" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
            <feOffset dy="1" />
            <feGaussianBlur stdDeviation="1" />
            <feColorMatrix type="matrix" values="0 0 0 0 0.0627451 0 0 0 0 0.0941176 0 0 0 0 0.156863 0 0 0 0.06 0" />
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_430_4587" />
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
            <feOffset dy="1" />
            <feGaussianBlur stdDeviation="1.5" />
            <feColorMatrix type="matrix" values="0 0 0 0 0.0627451 0 0 0 0 0.0941176 0 0 0 0 0.156863 0 0 0 0.1 0" />
            <feBlend mode="normal" in2="effect1_dropShadow_430_4587" result="effect2_dropShadow_430_4587" />
            <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_430_4587" result="shape" />
          </filter>
        </defs>
      </svg>
    </Content>
  )
}

const Content = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
`
