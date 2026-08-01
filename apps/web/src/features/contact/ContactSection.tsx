import { motion } from 'framer-motion';
import type { ContactChannel } from '@portfolio/contracts';
import { PageFooter } from '../../components/layout/PageFooter';
import { staggerDelay, useEntrance } from '../../components/motion/useEntrance';
import { ChannelIcon } from '../../components/ui/icons';
import { ContactTerminal } from './ContactTerminal';

interface ContactSectionProps {
  contacts: ContactChannel[];
  note: string;
  name: string;
  footerYear: number;
}

const isExternal = (url: string): boolean => /^https?:/i.test(url);

/**
 * A single channel tile. The tiles sit in a 1px-gap grid whose background paints
 * the dividing lines, so they fade without moving — a rise would open gaps in the
 * rules between them.
 */
const ContactLink = ({
  channel,
  index,
  external,
}: {
  channel: ContactChannel;
  index: number;
  external: boolean;
}) => {
  const entrance = useEntrance({ rise: 0, delay: staggerDelay(index) });

  return (
    <motion.a
      href={channel.url}
      {...(external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
      {...entrance}
    >
      <b>
        <ChannelIcon type={channel.type} />
        {channel.type.toUpperCase()}
      </b>
      {channel.label}
    </motion.a>
  );
};

export const ContactSection = ({ contacts, note, name, footerYear }: ContactSectionProps) => {
  const emailChannel = contacts.find((channel) => channel.url.startsWith('mailto:'));
  const headingEntrance = useEntrance();
  const terminalEntrance = useEntrance({ delay: 0.1 });

  return (
    <footer className="contact" id="contact">
      <motion.h2 {...headingEntrance}>
        Ready to
        <br />
        <em>execute?</em>
      </motion.h2>

      <motion.div {...terminalEntrance}>
        <ContactTerminal note={note} />
      </motion.div>

      <div className="contact-links">
        {contacts.map((channel, index) => (
          <ContactLink
            key={channel.type}
            channel={channel}
            index={index}
            external={isExternal(channel.url)}
          />
        ))}
      </div>

      <PageFooter
        name={name}
        contactUrl={emailChannel?.url ?? '#contact'}
        footerYear={footerYear}
      />
    </footer>
  );
};
