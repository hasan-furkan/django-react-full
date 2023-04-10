export const checkPermissions = (userRole, itemPermissions) => {
  if (!itemPermissions) {
    // Menü öğesi için belirtilen herhangi bir rol yoksa, her kullanıcıya izin verilir
    return true;
  }

  if (!userRole) {
    // Kullanıcı rolü belirtilmediyse, hiçbir menü öğesine erişemez
    return false;
  }

  // Menü öğesi için belirtilen rollerden herhangi birine sahipse, erişime izin verilir
  return itemPermissions.some((role) => role === userRole);
};
