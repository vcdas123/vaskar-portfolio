import { ExternalIcon } from '../ui/icons';

interface PageFooterProps {
  name: string;
  contactUrl: string;
  footerYear: number;
}

/**
 * Three equal columns: left, centre and right on desktop; stacked and centred at
 * 600px and below.
 */
export const PageFooter = ({ name, contactUrl, footerYear }: PageFooterProps) => (
  <div className="foot">
    <span>{name.toUpperCase()}</span>
    <span>
      <a href={contactUrl}>
        CONTACT
        <ExternalIcon />
      </a>
    </span>
    <span>© {footerYear} VASKAR DAS</span>
  </div>
);
