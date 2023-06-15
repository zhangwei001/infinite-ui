interface Window {
    crossimageConfig?: object;
}
interface Navigator {
    connection: NetworkInformation & { effectiveType: string };
    mozConnection: NetworkInformation & { effectiveType: string };
    webkitConnection: NetworkInformation & { effectiveType: string };
}
  