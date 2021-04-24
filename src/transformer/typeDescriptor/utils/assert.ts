import { LibraryTypeDescriptorName } from './getLibraryTypeDescriptorName';
import ts, { isLiteralTypeNode } from 'typescript';

export const isBigInt = (type: ts.Type, libraryDescriptorName?: LibraryTypeDescriptorName): boolean =>
  !!(type.flags & ts.TypeFlags.BigInt) || libraryDescriptorName === 'BigInt';

export const isBoolean = (type: ts.Type, libraryDescriptorName?: LibraryTypeDescriptorName): boolean =>
  !!(type.flags & ts.TypeFlags.Boolean) || libraryDescriptorName === 'Boolean';

export const isString = (type: ts.Type, libraryDescriptorName?: LibraryTypeDescriptorName): boolean =>
  !!(type.flags & ts.TypeFlags.String) || libraryDescriptorName === 'String';

export const isNumber = (type: ts.Type, libraryDescriptorName?: LibraryTypeDescriptorName): boolean =>
  !!(type.flags & ts.TypeFlags.Number) || libraryDescriptorName === 'Number';

export const isSymbol = (type: ts.Type, libraryDescriptorName?: LibraryTypeDescriptorName): boolean =>
  !!(type.flags & ts.TypeFlags.ESSymbol) || libraryDescriptorName === 'Symbol';

export const isDate = (
  type: ts.Type,
  libraryDescriptorName?: LibraryTypeDescriptorName,
): libraryDescriptorName is LibraryTypeDescriptorName => libraryDescriptorName === 'Date';

export const isMap = (type: ts.Type, libraryDescriptorName?: LibraryTypeDescriptorName): type is ts.TypeReference =>
  libraryDescriptorName === 'Map';

export const isSet = (type: ts.Type, libraryDescriptorName?: LibraryTypeDescriptorName): type is ts.TypeReference =>
  libraryDescriptorName === 'Set';

export const isPromise = (type: ts.Type, libraryDescriptorName?: LibraryTypeDescriptorName): boolean =>
  libraryDescriptorName === 'Promise';

export const isRegExp = (
  type: ts.Type,
  libraryDescriptorName?: LibraryTypeDescriptorName,
): libraryDescriptorName is LibraryTypeDescriptorName => libraryDescriptorName === 'RegExp';

export const isInterface = (type: ts.Type, libraryDescriptorName?: LibraryTypeDescriptorName): boolean =>
  !!(type.flags & ts.TypeFlags.Object) || libraryDescriptorName === 'Object';

export const isLiteral = (type: ts.Type): type is ts.LiteralType =>
  (typeof type.isLiteral === 'function' && type.isLiteral()) ||
  !!(type.flags & ts.TypeFlags.BigIntLiteral) ||
  !!(type.flags & ts.TypeFlags.Literal);

export const isNull = (type: ts.Type): boolean => !!(type.flags & ts.TypeFlags.Null);

export const isUndefined = (type: ts.Type): boolean =>
  !!(type.flags & ts.TypeFlags.Undefined || type.flags & ts.TypeFlags.Void);

export const isAny = (type: ts.Type): boolean => !!(type.flags & ts.TypeFlags.Any || type.flags & ts.TypeFlags.Unknown);

export const isNever = (type: ts.Type): boolean => !!(type.flags & ts.TypeFlags.Never);

export const isObjectKeyword = (typeNode: ts.TypeNode | undefined): boolean =>
  typeNode?.kind === ts.SyntaxKind.ObjectKeyword;

export const isTrueKeyword = (typeNode: ts.TypeNode | undefined): boolean =>
  typeNode?.kind === ts.SyntaxKind.TrueKeyword;

export const isFalseKeyword = (typeNode: ts.TypeNode | undefined): boolean =>
  typeNode?.kind === ts.SyntaxKind.FalseKeyword;

export const isTuple = (type: ts.Type, typeNode?: ts.TypeNode): type is ts.TupleType =>
  typeNode?.kind === ts.SyntaxKind.TupleType;

export const isIntersection = (type: ts.Type, typeNode?: ts.TypeNode): type is ts.IntersectionType =>
  (typeof type.isIntersection === 'function' && type.isIntersection()) ||
  typeNode?.kind === ts.SyntaxKind.IntersectionType;

export const isUnion = (type: ts.Type, typeNode?: ts.TypeNode): type is ts.UnionType =>
  (typeof type.isUnion === 'function' && type.isUnion()) ||
  typeNode?.kind === ts.SyntaxKind.UnionType ||
  !!(type.getFlags() & ts.TypeFlags.Union);

export const isFalse = (type: ts.Type, typeNode?: ts.TypeNode): type is ts.LiteralType => {
  if (isFalseKeyword(typeNode)) return true;
  if (isLiteral(type) && (type.value as unknown) === false) return true;
  if (typeNode && isLiteralTypeNode(typeNode) && typeNode.literal.kind === ts.SyntaxKind.FalseKeyword) return true;

  return false;
}

export const isTrue = (type: ts.Type, typeNode?: ts.TypeNode): type is ts.LiteralType => {
  if (isTrueKeyword(typeNode)) return true;
  if (isLiteral(type) && (type.value as unknown) === true) return true;
  if (typeNode && isLiteralTypeNode(typeNode) && typeNode.literal.kind === ts.SyntaxKind.TrueKeyword) return true;

  return false;
}

export const isClassOrInterface = (type: ts.Type, typeNode?: ts.TypeNode): type is ts.InterfaceType =>
  (typeof type.isClassOrInterface === 'function' && type.isClassOrInterface()) ||
  typeNode?.kind === ts.SyntaxKind.InterfaceDeclaration ||
  !!(type.flags & ts.TypeFlags.Object);

export const isFunction = (
  type: ts.Type,
  libraryDescriptorName?: LibraryTypeDescriptorName,
  typeNode?: ts.TypeNode,
): boolean =>
  typeNode?.kind === ts.SyntaxKind.FunctionType ||
  typeNode?.kind === ts.SyntaxKind.ConstructorType ||
  libraryDescriptorName === 'Function' ||
  !!type.getConstructSignatures()?.length ||
  !!type.getCallSignatures()?.length;

const isArrayType = (typeChecker: ts.TypeChecker, type: ts.Type): boolean =>
  typeof (typeChecker as any).isArrayType === 'function' && !!(typeChecker as any)?.isArrayType(type);

export const isArray = (
  typeChecker: ts.TypeChecker,
  type: ts.Type,
  libraryDescriptorName?: LibraryTypeDescriptorName,
  typeNode?: ts.TypeNode,
): type is ts.TypeReference =>
  typeNode?.kind === ts.SyntaxKind.ArrayType || libraryDescriptorName === 'Array' || isArrayType(typeChecker, type);
