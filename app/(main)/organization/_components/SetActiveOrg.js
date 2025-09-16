"use client";

import { useEffect, useRef } from "react";
import { useOrganization, useOrganizationList } from "@clerk/nextjs";
import { toast } from "sonner";

export default function SetActiveOrg({ orgId }) {
  const { organization, isLoaded: orgLoaded } = useOrganization();
  const { isLoaded, userMemberships, setActive } = useOrganizationList({
    userMemberships: { infinite: true },
  });
  const lastSetRef = useRef(null);

  useEffect(() => {
    if (!isLoaded || !orgLoaded || !orgId) return;

    const target = userMemberships?.data?.find(
      (m) => m.organization?.slug === orgId || m.organization?.id === orgId
    )?.organization;

    // If already active, do nothing
    const currentId = organization?.id;
    const currentSlug = organization?.slug;
    const isAlreadyActive = orgId === currentId || orgId === currentSlug;

    if (target && !isAlreadyActive && lastSetRef.current !== target.id) {
      setActive({ organization: target });
      lastSetRef.current = target.id;
      toast.success(`Switched to ${target.name}`);
    }
  }, [isLoaded, orgLoaded, orgId, userMemberships, setActive, organization]);

  return null;
}
