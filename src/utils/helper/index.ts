/**
 * BASIC HELPERS FOR THE APPLICATION
 */

import crypto from 'crypto';

export const helper = {

  /**
   * create filename hash (uses sha256)
   * @param prefix [Required] a prefix for the file category e.g resume
   * @param filename [Required] file name to be hashed
   */
  createFilenameHash : (prefix: string, filename: string) => {
    return `${prefix}-${crypto.createHash('sha256').update(filename).digest('hex')}`;
  },

};
