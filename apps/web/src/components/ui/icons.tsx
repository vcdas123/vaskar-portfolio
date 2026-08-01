import type { ComponentType } from 'react';
import {
  IconArrowLeft,
  IconArrowRight,
  IconArrowUpRight,
  IconBrandGithub,
  IconBrandLinkedin,
  IconChevronDown,
  IconCheck,
  IconCornerDownLeft,
  IconFileCode,
  IconLink,
  IconLoader2,
  IconMail,
  IconPhone,
  IconPlayerPlay,
  IconRefresh,
  IconX,
  type IconProps,
} from '@tabler/icons-react';

/**
 * Icon vocabulary for the app.
 *
 * Tabler icons are re-exported through one module so size and stroke stay
 * consistent everywhere and no component reaches for an arbitrary variant. The
 * defaults are tuned for the terminal's mono type: a 14px box at stroke 1.5 sits
 * on the same optical weight as `DM Mono` at 10–13px.
 *
 * Icons here are decorative — they sit beside text that already says the same
 * thing — so every one renders `aria-hidden`. The `.icon` class handles baseline
 * alignment; see `icons.css`.
 */

export type IconComponent = ComponentType<IconProps>;

const DEFAULTS: IconProps = {
  size: 14,
  stroke: 1.5,
  'aria-hidden': true,
  className: 'icon',
};

/** Wraps a Tabler icon with the shared defaults, allowing per-use overrides. */
const withDefaults = (Icon: IconComponent): IconComponent => {
  const Wrapped = (props: IconProps) => <Icon {...DEFAULTS} {...props} />;
  Wrapped.displayName = `Portfolio(${Icon.displayName ?? 'Icon'})`;
  return Wrapped;
};

export const FolderOpenIcon = withDefaults(IconChevronDown);
export const FileIcon = withDefaults(IconFileCode);
export const CloseIcon = withDefaults(IconX);
export const CheckIcon = withDefaults(IconCheck);
export const RunIcon = withDefaults(IconPlayerPlay);
export const SpinnerIcon = withDefaults(IconLoader2);
export const BackIcon = withDefaults(IconArrowLeft);
export const FlowArrowIcon = withDefaults(IconArrowRight);
export const ExternalIcon = withDefaults(IconArrowUpRight);
export const SubmitIcon = withDefaults(IconCornerDownLeft);
export const RestartIcon = withDefaults(IconRefresh);

/** Contact channels are matched by their seeded `type`, falling back to a link. */
const CHANNEL_ICONS: Record<string, IconComponent> = {
  email: withDefaults(IconMail),
  phone: withDefaults(IconPhone),
  linkedin: withDefaults(IconBrandLinkedin),
  github: withDefaults(IconBrandGithub),
};

const FallbackChannelIcon = withDefaults(IconLink);

/**
 * Picks the mark for a contact channel from its seeded `type`. Exported as a
 * component rather than a lookup function so this module only exports components,
 * which is what keeps fast refresh working for it.
 */
export const ChannelIcon = ({ type, ...props }: IconProps & { type: string }) => {
  const Icon = CHANNEL_ICONS[type.toLowerCase()] ?? FallbackChannelIcon;
  return <Icon {...props} />;
};
