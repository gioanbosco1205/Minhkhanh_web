"use client";
import { useGetAuthUserQuery, useUpdateTenantSettingsMutation } from '@/state/api'
import React from 'react'
import SettingsForm from '@/components/SettingsForm'

const TenantSettings = () => {
  const { data: authUser, isLoading } = useGetAuthUserQuery(); 
  const [updateTenant] = useUpdateTenantSettingsMutation();

  if (isLoading) return <>Loading...</>;
  if (!authUser) return <>No user found</>;

  // fallback sang cognitoInfo nếu userInfo không có
  const initialData = {
    name: authUser?.userInfo?.name || authUser?.cognitoInfo?.username || "",
    email: authUser?.userInfo?.email || authUser?.cognitoInfo?.email || "",
    phoneNumber: authUser?.userInfo?.phoneNumber || authUser?.cognitoInfo?.phone_number || "",
  };

  const handleSubmit = async (data: typeof initialData) => {
    await updateTenant({
      cognitoId: authUser?.cognitoInfo?.userId,
      ...data,
    });
  };

  return (
    <SettingsForm
      initialData={initialData}
      onSubmit={handleSubmit}
      userType="tenant"
    />
  );
}

export default TenantSettings;
