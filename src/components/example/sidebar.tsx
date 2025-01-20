'use client';

import { clsxMerge } from '@/src/utils/clsxMerge';
import * as Headless from '@headlessui/react';
import { LayoutGroup, motion } from 'framer-motion';
import React, { forwardRef, useId } from 'react';
import { TouchTarget } from './Button/Button';
import { Link } from './link';

export function Sidebar({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'nav'>) {
  return (
    <nav
      {...props}
      className={clsxMerge(className, 'flex h-full min-h-0 flex-col')}
    />
  );
}

export function SidebarHeader({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      {...props}
      className={clsxMerge(
        className,
        'flex flex-col border-b border-teal-950/5 p-4 dark:border-white/5 [&>[data-slot=section]+[data-slot=section]]:mt-2.5',
      )}
    />
  );
}

export function SidebarBody({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      {...props}
      className={clsxMerge(
        className,
        'flex flex-1 flex-col overflow-y-auto p-4 [&>[data-slot=section]+[data-slot=section]]:mt-8',
      )}
    />
  );
}

export function SidebarFooter({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      {...props}
      className={clsxMerge(
        className,
        'flex flex-col border-t border-teal-950/5 p-4 dark:border-white/5 [&>[data-slot=section]+[data-slot=section]]:mt-2.5',
      )}
    />
  );
}

export function SidebarSection({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  let id = useId();

  return (
    <LayoutGroup id={id}>
      <div
        {...props}
        data-slot="section"
        className={clsxMerge(className, 'flex flex-col gap-0.5')}
      />
    </LayoutGroup>
  );
}

export function SidebarDivider({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'hr'>) {
  return (
    <hr
      {...props}
      className={clsxMerge(
        className,
        'my-4 border-t border-teal-950/5 lg:-mx-4 dark:border-white/5',
      )}
    />
  );
}

export function SidebarSpacer({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      aria-hidden="true"
      {...props}
      className={clsxMerge(className, 'mt-8 flex-1')}
    />
  );
}

export function SidebarHeading({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'h3'>) {
  return (
    <h3
      {...props}
      className={clsxMerge(
        className,
        'mb-1 px-2 text-xs/6 font-medium text-teal-500 dark:text-teal-400',
      )}
    />
  );
}

export const SidebarItem = forwardRef(function SidebarItem(
  {
    current,
    className,
    children,
    ...props
  }: { current?: boolean; className?: string; children: React.ReactNode } & (
    | Omit<Headless.ButtonProps, 'as' | 'className'>
    | Omit<Headless.ButtonProps<typeof Link>, 'as' | 'className'>
  ),
  ref: React.ForwardedRef<HTMLAnchorElement | HTMLButtonElement>,
) {
  let classes = clsxMerge(
    // Base
    'flex w-full items-center gap-3 rounded-lg px-2 py-2.5 text-left text-base/6 font-medium text-teal-950 sm:py-2 sm:text-sm/5',
    // Leading icon/icon-only
    'data-[slot=icon]:*:size-6 data-[slot=icon]:*:shrink-0 data-[slot=icon]:*:fill-teal-500 sm:data-[slot=icon]:*:size-5',
    // Trailing icon (down chevron or similar)
    'data-[slot=icon]:last:*:ml-auto data-[slot=icon]:last:*:size-5 sm:data-[slot=icon]:last:*:size-4',
    // Avatar
    'data-[slot=avatar]:*:-m-0.5 data-[slot=avatar]:*:size-7 data-[slot=avatar]:*:[--ring-opacity:10%] sm:data-[slot=avatar]:*:size-6',
    // Hover
    'data-[hover]:bg-teal-950/5 data-[slot=icon]:*:data-[hover]:fill-teal-950',
    // Active
    'data-[active]:bg-teal-950/5 data-[slot=icon]:*:data-[active]:fill-teal-950',
    // Current
    'data-[slot=icon]:*:data-[current]:fill-teal-950',
    // Dark mode
    'dark:text-white dark:data-[slot=icon]:*:fill-teal-400',
    'dark:data-[hover]:bg-white/5 dark:data-[slot=icon]:*:data-[hover]:fill-white',
    'dark:data-[active]:bg-white/5 dark:data-[slot=icon]:*:data-[active]:fill-white',
    'dark:data-[slot=icon]:*:data-[current]:fill-white',
  );

  return (
    <span className={clsxMerge(className, 'relative')}>
      {current && (
        <motion.span
          layoutId="current-indicator"
          className="absolute inset-y-2 -left-4 w-0.5 rounded-full bg-teal-950 dark:bg-white"
        />
      )}
      {'href' in props ? (
        <Headless.CloseButton
          as={Link}
          {...props}
          className={classes}
          data-current={current ? 'true' : undefined}
          ref={ref}
        >
          <TouchTarget>{children}</TouchTarget>
        </Headless.CloseButton>
      ) : (
        <Headless.Button
          {...props}
          className={clsxMerge('cursor-default', classes)}
          data-current={current ? 'true' : undefined}
          ref={ref}
        >
          <TouchTarget>{children}</TouchTarget>
        </Headless.Button>
      )}
    </span>
  );
});

export function SidebarLabel({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'span'>) {
  return <span {...props} className={clsxMerge(className, 'truncate')} />;
}