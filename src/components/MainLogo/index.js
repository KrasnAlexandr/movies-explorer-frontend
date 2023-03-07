import { Link } from 'react-router-dom';
import { PAGE_MANAGER } from '../../utils/constants';

export const MainLogo = ({ className }) => (
  <Link to={PAGE_MANAGER.HOME}>
    <svg
      width='38'
      height='38'
      viewBox='0 0 38 38'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
    >
      <path
        d='M0 19C0 8.50659 8.50659 0 19 0C29.4934 0 38 8.50659 38 19C38 29.4934 29.4934 38 19 38C8.50659 38 0 29.4934 0 19Z'
        fill='#3DDC84'
      />
      <path
        d='M26.3752 11H11.6248C10.1751 11 9 12.212 9 13.7061V21.203C9 21.3421 9.01022 21.4788 9.03025 21.6124C9.00974 21.8121 9 22.014 9 22.2178C9 26.5151 13.4769 30 18.9999 30C24.5229 30 29 26.5151 29 22.2178C29 22.0139 28.9893 21.8121 28.9697 21.6124C28.9893 21.4789 29 21.3421 29 21.203V13.7062C29 12.2116 27.8236 11 26.3752 11Z'
        fill='white'
      />
    </svg>
  </Link>
);
