"use client";

import * as R from "ramda";
import React, { useContext, useEffect, createContext } from "react";
import Loading from "./Loading";
import { ErrorBlock } from "../error/ErrorBlock";
import { useAppActions } from "@/api/App/tasks";

const DummyContext = createContext({ loading: false, error: null });

type ResourceLoaderProps = {
  onLoad?: () => void | Promise<void>;
  context?: React.Context<any>;
  children: React.ReactNode;
};

export const ResourceLoader = ({
  onLoad,
  children,
  context,
}: ResourceLoaderProps) => {
  const state = useContext(context || DummyContext);
  const { onWhoAmI } = useAppActions();
  const { loading, error } = state;

  useEffect(() => {
    if (!R.isNil(onLoad)) {
      onLoad();
    }
    onWhoAmI();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorBlock error={error} />;
  }

  return children;
};
